import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuCategoryGet, MenuItemGroupGet } from '@common/api-client/models';
import { MenuCategoryControllerService, MenuItemGroupControllerService } from '@common/api-client/services';
import { EditorDialogService } from '../editors/editor-dialog.service';

@Component({
  selector: 'app-menu-category-items',
  templateUrl: './menu-category-items.component.html',
  styleUrls: ['./menu-category-items.component.scss', '../menu-element-drag-drop-list.scss']
})
export class MenuCategoryItemsComponent implements OnDestroy {

  @Output('openItemGroupEditor')
  openItemGroupEditor = new EventEmitter<{
    group: MenuItemGroupGet,
    categoryRef: string
  }>();

  public _category: MenuCategoryGet | undefined;
  private readonly onDestroy = new Subject<void>();

  @Input() set category(value: MenuCategoryGet) {
    this._category = value;
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

  public openEditor(menuItemGroup: MenuItemGroupGet) {
    if (this._category) {
      this.openItemGroupEditor.emit({
        group: menuItemGroup,
        categoryRef: menuItemGroup.categoryRef
      })
    } else {
      throw 'Category not defined';
    }
  }

  private itemGroupUpdated(newItemGroup: MenuItemGroupGet) {
    if (!this._category) { throw 'Category not defined'; }
    if (newItemGroup.categoryRef !== this._category.ref) { return; }

    for (let i = 0; i < this._category.menuItemGroups.length; i++) {
      const existingItemGroup = this._category.menuItemGroups[i];
      if (existingItemGroup.ref === newItemGroup.ref) {
        this._category.menuItemGroups[i] = newItemGroup;
        this.editorDialogService.closeDialog();
        break;
      }
    }
  }

  private itemGroupDeleted(ref: string) {
    if (!this._category) { throw 'Category not defined'; }

    for (let i = 0; i < this._category.menuItemGroups.length; i++) {
      const existingItemGroup = this._category.menuItemGroups[i];
      if (existingItemGroup.ref === ref) {
        this._category.menuItemGroups.splice(i, 1);
        this.editorDialogService.closeDialog();
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private arrayMove(items: MenuItemGroupGet[], old_index: number, new_index: number
  ) {
    items[old_index].elementOrder = items[new_index].elementOrder;

    this.itemGroupService.putItemGroup({
      restaurantRef: this.accountService.getRestaurantRef(),
      menuItemGroupRef: items[old_index].ref,
      body: items[old_index]
    }).subscribe((_) => {
      this.reloadCategory();
    });

    items.splice(new_index, 0, items.splice(old_index, 1)[0]);
  };

  private reloadCategory() {
    if (!this._category) { throw 'Category not defined'; }

    const activeCategory = this._category;
    this.categoryService.getCategory({
      restaurantRef: this.accountService.getRestaurantRef(),
      categoryRef: this._category.ref
    }).subscribe(c => {
      Object.assign(activeCategory, c);
    })
  }

  public dragDropListCaught(event: CdkDragDrop<string[]>) {
    if (!this._category) { throw 'Category not defined'; }
    this.arrayMove(this._category.menuItemGroups, event.previousIndex, event.currentIndex)
  }
}
