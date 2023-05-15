import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuCategoryGet, MenuItemGroupGet } from '@common/api-client/models';
import { MenuCategoryControllerService, MenuItemGroupControllerService } from '@common/api-client/services';
import { EditorDialogService } from '../editors/editor-dialog.service';

@Component({
  selector: 'app-menu-category-items',
  templateUrl: './menu-category-items.component.html',
  styleUrls: ['../menu-element-drag-drop-list.scss', './menu-category-items.component.scss']
})
export class MenuCategoryItemsComponent implements OnDestroy {

  groups: {
    group: MenuItemGroupGet,
    open: boolean
  }[] = []

  categoryRef: string | undefined;
  private readonly onDestroy = new Subject<void>();

  @Input() set category(value: MenuCategoryGet) {
    this.categoryRef = value.ref;

    this.groups = [];
    for (const group of value.menuItemGroups) {
      this.groups.push({
        group: group,
        open: false
      })
    }
  }

  constructor(private editorDialogService: EditorDialogService,
    private itemGroupService: MenuItemGroupControllerService,
    private accountService: AccountService,
    private categoryService: MenuCategoryControllerService
  ) {
    this.editorDialogService.onItemGroupUpdated.pipe(
      takeUntil(this.onDestroy)
    ).subscribe(e => this.itemGroupUpdated(e))

    this.editorDialogService.onItemGroupDeleted.pipe(
      takeUntil(this.onDestroy)
    ).subscribe(e => this.itemGroupDeleted(e));
  }

  openEditor(menuItemGroup: MenuItemGroupGet) {
    this.editorDialogService.onEditItemGroup.emit({
      group: menuItemGroup,
      categoryRef: menuItemGroup.categoryRef
    })
  }

  getImageUrl(ref: string) {
    const restaurantRef = this.accountService.getRestaurantRef()
    return `/api/public/v1/restaurant/${restaurantRef}/multimedia/${ref}`;
  }

  private itemGroupUpdated(newItemGroup: MenuItemGroupGet) {
    if (!this.categoryRef) { throw 'Category not defined'; }
    if (newItemGroup.categoryRef !== this.categoryRef) { return; }

    for (let i = 0; i < this.groups.length; i++) {
      const existingItemGroup = this.groups[i].group;
      if (existingItemGroup.ref === newItemGroup.ref) {
        this.groups[i].group = newItemGroup;
        this.editorDialogService.closeDialog();
        break;
      }
    }
  }

  private itemGroupDeleted(ref: string) {
    for (let i = 0; i < this.groups.length; i++) {
      const existingItemGroup = this.groups[i];
      if (existingItemGroup.group.ref === ref) {
        this.groups.splice(i, 1);
        this.editorDialogService.closeDialog();
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
    if (!this.categoryRef) { throw 'Category not defined'; }

    const activeCategory = this.categoryRef;
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
