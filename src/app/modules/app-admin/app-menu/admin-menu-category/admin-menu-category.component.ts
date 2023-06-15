import { Component, OnDestroy } from '@angular/core';
import { Subject, catchError, takeUntil, tap } from 'rxjs';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuCategoryGet, MenuItemGet, MenuItemGroupGet } from '@common/api-client/models';
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
    isAggregate: boolean
  }[] = []

  openGroupRef: string | undefined;
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

    this.editorDialogService.onItemDeleted.pipe(
      tap(e => this.onDeleteItem(e.ref, e.groupRef)),
      takeUntil(this.onDestroy)
    ).subscribe()

    this.editorDialogService.onItemCreated.pipe(
      tap(e => this.onCreateItem(e)),
      takeUntil(this.onDestroy)
    ).subscribe()

    const categoryRef = this.route.snapshot.paramMap.get('categoryRef');

    this.route.params.pipe(
      tap(params => this.openGroupRef = params['menuItemGroupRef'] ? params['menuItemGroupRef'] : undefined),
      takeUntil(this.onDestroy)
    ).subscribe();

    if (categoryRef === null) {
      throw 'Category ref not defined';
    }

    this.categoryRef = categoryRef;
    this.loadCategory(categoryRef);
  }

  onCreateItem(item: MenuItemGet) {
    for (const group of this.groups) {
      if (item.menuItemGroupRef === group.group.ref) {
        group.group.menuItems.push(item)
        group.isAggregate = this.isAggregate(group.group)
      }
    }
  }

  onDeleteItem(ref: string, groupRef: string) {
    for (const group of this.groups) {
      if (groupRef === group.group.ref) {
        group.group.menuItems = group.group.menuItems.filter(e => e.ref !== ref)
        group.isAggregate = this.isAggregate(group.group)
      }
    }
  }

  itemGroupCreated(group: MenuItemGroupGet) {
    if (group.categoryRef === this.categoryRef) {
      this.groups.push({
        group: group,
        isAggregate: this.isAggregate(group)
      });
    }
  }

  private isAggregate(group: MenuItemGroupGet) : boolean {
    return group.menuItems.length === 1;
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
            isAggregate: this.isAggregate(group)
          })
        }
      }),
      catchError(() => {
        this.router.navigate(['/admin/menu/categories'])
        throw 'Failed to load category detials'
      })
    ).subscribe();
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
        this.groups[i].isAggregate = this.isAggregate(newItemGroup);
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
          isAggregate: this.isAggregate(e)
        }
      })
    ).subscribe();
  }

  moveDown(group: MenuItemGroupGet) {
    const activeIndex = this.groups.map(e => e.group).indexOf(group)

    this.itemGroupService.moveDown3({
      restaurantRef: this.accountService.getRestaurantRef(),
      menuItemGroupRef: group.ref
    }).pipe(
      tap(e => {
        this.groups[activeIndex] = this.groups[activeIndex - 1];
        this.groups[activeIndex - 1] = {
          group: e,
          isAggregate: this.isAggregate(e)
        }
      })
    ).subscribe();
  }
}
