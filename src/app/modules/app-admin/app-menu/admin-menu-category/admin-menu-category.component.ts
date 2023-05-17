import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuCategoryGet, MenuItemGet, MenuItemGroupGet } from '@common/api-client/models';
import { MenuCategoryControllerService, MenuItemGroupControllerService } from '@common/api-client/services';
import { EditorDialogService } from '../editors/editor-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-menu-category',
  templateUrl: './admin-menu-category.component.html',
  styleUrls: ['../menu-element-drag-drop-list.scss', './admin-menu-category.component.scss']
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

    this.editorDialogService.onEditItem.pipe(
      takeUntil(this.onDestroy)
    ).subscribe(e => this.editItem(e));

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
            open: false
          })
        }
      })
    ).subscribe();
  }

  openEditor(menuItemGroup: MenuItemGroupGet) {
    this.editItemGroup(menuItemGroup)
  }

  editItemGroup(group: MenuItemGroupGet) {
    this.router.navigate(['/admin/menu/category/', this.categoryRef, 'group', group.ref, 'edit'])
  }

  editItem(item: MenuItemGet) {
    this.router.navigate(['/admin/menu/category/', this.categoryRef, 'item', item.ref, 'edit', 'selects'])
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

  private arrayMove(items: {
    group: MenuItemGroupGet,
    open: boolean
  }[], old_index: number, new_index: number
  ) {
    items[old_index].group.elementOrder = items[new_index].group.elementOrder;

    this.itemGroupService.putItemGroup({
      restaurantRef: this.accountService.getRestaurantRef(),
      menuItemGroupRef: items[old_index].group.ref,
      body: items[old_index].group
    }).subscribe((_) => {
      this.reloadCategory();
    });

    items.splice(new_index, 0, items.splice(old_index, 1)[0]);
  };

  private reloadCategory() {
    if (!this.category) { throw 'Category not defined'; }

    const activeCategory = this.category.ref;
    this.categoryService.getCategory({
      restaurantRef: this.accountService.getRestaurantRef(),
      categoryRef: activeCategory
    }).subscribe(c => {
      Object.assign(activeCategory, c);
    })
  }

  dragDropListCaught(event: CdkDragDrop<string[]>) {
    console.log("DROP")
    if (!this.groups) { throw 'Groups not defined'; }
    if (event.previousIndex != event.currentIndex) {
      this.arrayMove(this.groups, event.previousIndex, event.currentIndex)
    }
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
}
