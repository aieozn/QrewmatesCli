import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuCategoryGet, MenuItemGroupGet } from '@common/api-client/models';
import { MenuCategoryControllerService, MenuItemGroupControllerService } from '@common/api-client/services';
import { EditorDialogService } from '../editors/editor-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-menu-category',
  templateUrl: './admin-menu-category.component.html',
  styleUrls: ['../shared-css/menu-element-drag-drop-list.scss', './admin-menu-category.component.scss']
})
export class AdminMenuCategoryComponent implements OnDestroy {

  groups: {
    group: MenuItemGroupGet,
    open: boolean
  }[] = []

  category: MenuCategoryGet | undefined;
  private readonly onDestroy = new Subject<void>();
  private categoryRef: string;

  constructor(private editorDialogService: EditorDialogService,
    private itemGroupService: MenuItemGroupControllerService,
    private accountService: AccountService,
    private categoryService: MenuCategoryControllerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editorDialogService.onItemGroupUpdated.pipe(
      takeUntil(this.onDestroy)
    ).subscribe(e => this.itemGroupUpdated(e))

    this.editorDialogService.onItemGroupDeleted.pipe(
      takeUntil(this.onDestroy)
    ).subscribe(e => this.itemGroupDeleted(e));

    this.editorDialogService.onItemGroupCreated.pipe(
      tap(e => this.itemGroupCreated(e)),
      takeUntil(this.onDestroy)
    ).subscribe()

    const categoryRef = this.route.snapshot.paramMap.get('categoryRef');  

    if (categoryRef === null) {
      throw 'Category ref not defined';
    }

    this.categoryRef = categoryRef;
    this.loadCategory(categoryRef);
  }

  itemGroupCreated(group: MenuItemGroupGet) {
    if (group.categoryRef === this.categoryRef) {
      this.groups.push({
        group: group,
        open: false
      });
    }
  }

  loadCategory(ref: string) {
    this.categoryService.getCategory({
      restaurantRef: this.accountService.getRestaurantRef(),
      categoryRef: ref
    }).pipe(
      tap(category => {
        this.groups = [];
        this.category = category;
        
        for (const group of category.menuItemGroups) {
          this.groups.push({
            group: group,
            open: this.getActiveGroupRef() === group.ref
          })
        }
      })
    ).subscribe();
  }

  getActiveGroupRef() : string | undefined {
    let activeGroupRef: string | undefined;

    if (this.route.children && this.route.children.length > 0) {
      const value = this.route.children[0].snapshot.paramMap.get('menuItemGroupRef');

      if (value) {
        activeGroupRef = value
      }
    }

    return activeGroupRef
  }

  getImageUrl(ref: string) {
    const restaurantRef = this.accountService.getRestaurantRef()
    return `/api/public/v1/restaurant/${restaurantRef}/multimedia/${ref}`;
  }

  private itemGroupUpdated(newItemGroup: MenuItemGroupGet) {
    if (!this.category) { throw 'Category not defined'; }
    if (newItemGroup.categoryRef !== this.category.ref) { return; }

    for (let i = 0; i < this.groups.length; i++) {
      const existingItemGroup = this.groups[i].group;
      if (existingItemGroup.ref === newItemGroup.ref) {
        this.groups[i].group = newItemGroup;
        break;
      }
    }
  }

  private itemGroupDeleted(ref: string) {
    for (let i = 0; i < this.groups.length; i++) {
      const existingItemGroup = this.groups[i];
      if (existingItemGroup.group.ref === ref) {
        this.groups.splice(i, 1);
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  extend(group: MenuItemGroupGet) {
    this.closeAll();
    this.groups.filter(e => e.group.ref === group.ref)[0].open = true;
  }

  closeAll() {
    for (const group of this.groups) {
      group.open = false;
    }
  }

  moveUp(group: MenuItemGroupGet) {
    const activeIndex = this.groups.map(e => e.group).indexOf(group)

    this.itemGroupService.moveUp3({
      restaurantRef: this.accountService.getRestaurantRef(),
      menuItemGroupRef: group.ref
    }).pipe(
      tap(e => {
        this.groups[activeIndex] = this.groups[activeIndex + 1];
        this.groups[activeIndex + 1] = {
          group: e,
          open: false
        }
      })
    ).subscribe();
  }

  moveDown(group: MenuItemGroupGet) {
    const activeIndex = this.groups.map(e => e.group).indexOf(group)
    const isOpen = this.groups[activeIndex].open;

    this.itemGroupService.moveDown3({
      restaurantRef: this.accountService.getRestaurantRef(),
      menuItemGroupRef: group.ref
    }).pipe(
      tap(e => {
        this.groups[activeIndex] = this.groups[activeIndex - 1];
        this.groups[activeIndex - 1] = {
          group: e,
          open: isOpen
        }
      })
    ).subscribe();
  }
}
