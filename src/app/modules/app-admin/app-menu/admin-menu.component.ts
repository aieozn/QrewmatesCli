import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuCategoryGet, MenuItemGet, MenuItemGroupGet } from '@common/api-client/models';
import { MenuCategoryControllerService } from '@common/api-client/services';
import { EditCategoryComponent } from './editors/edit-category/edit-category.component';
import { EditItemGroupComponent } from './editors/edit-item-group/edit-item-group.component';
import { EditorDialogService } from './editors/editor-dialog.service';
import { ElementEditorDirective } from './elementEditorDirective';
import { EditItemComponent } from './editors/edit-item/edit-item.component';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./menu-element-drag-drop-list.scss', './admin-menu.component.scss']
})
export class AdminMenuComponent implements OnDestroy {

  private readonly onDestroy = new Subject<void>();
  
  @ViewChild(ElementEditorDirective, {static: true}) elementEditorHost!: ElementEditorDirective;
  
  categories: {
    category: MenuCategoryGet,
    open: boolean
  }[] = [];

  constructor(
    private menuCategoryService: MenuCategoryControllerService,
    private accountService: AccountService,
    private editorDialogService: EditorDialogService
  ) {
    this.loadCategories();

    this.editorDialogService.onCloseDialog
    .pipe(
      takeUntil(this.onDestroy)
    ).subscribe(_ => {
      this.closeEditor();
    })

    this.editorDialogService.onCategoryCreated
    .pipe(
      takeUntil(this.onDestroy)
    ).subscribe(e => this.categoryCreated(e));

    this.editorDialogService.onCategoryUpdated
    .pipe(
      takeUntil(this.onDestroy)
    ).subscribe(e => this.categoryUpdated(e));

    this.editorDialogService.onCategoryDeleted
    .pipe(
      takeUntil(this.onDestroy)
    ).subscribe(e => this.categoryDeleted(e));

    this.editorDialogService.onEditItemGroup.pipe(
      takeUntil(this.onDestroy),
      tap(e => this.editItemGroup(e))
    ).subscribe();

    this.editorDialogService.onEditItem.pipe(
      takeUntil(this.onDestroy),
      tap(e => this.editItem(e))
    ).subscribe();
  }

  private loadCategories() {
    this.menuCategoryService.getCategories({
      restaurantRef: this.accountService.getRestaurantRef()
    }).subscribe(loadedCategories => {
      this.categories = [];
      for (const loadedCategory of loadedCategories) {
        this.categories.push({
          category: loadedCategory,
          open: false
        })
      }
      
      // TODO remove
      this.editItem({
        item: loadedCategories[0].menuItemGroups[0].menuItems[0]
      })
    })
  }

  extendCategory(category: MenuCategoryGet) {
    this.closeCategories();
    this.categories.filter(e => e.category.ref === category.ref)[0].open = true;
  }

  closeCategories() {
    for (const category of this.categories) {
      category.open = false;
    }
  }

  closeEditor() {
    const viewContainerRef = this.elementEditorHost.viewContainerRef;
    viewContainerRef.clear();
  }

  editCategory(category: MenuCategoryGet) {

    const viewContainerRef = this.elementEditorHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(EditCategoryComponent);
    componentRef.instance.category = category;
    // componentRef.instance.data = adItem.data;
  }

  editItemGroup(itemGroupData: {
    group: MenuItemGroupGet,
    categoryRef: string
  }) {

    const viewContainerRef = this.elementEditorHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(EditItemGroupComponent);

    componentRef.instance.group = itemGroupData.group;
  }

  editItem(itemData: {
    item: MenuItemGet
  }) {
    const viewContainerRef = this.elementEditorHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(EditItemComponent);
    componentRef.instance.item = itemData.item;
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private categoryUpdated(newCategory: MenuCategoryGet) {
    for (let i = 0; i < this.categories.length; i++) {
      const existingCategory = this.categories[i];
      if (existingCategory.category.ref === newCategory.ref) {
        this.categories[i].category = newCategory;
        break;
      }
    }
    this.closeEditor();
  }

  private categoryDeleted(ref: string) {
    for (let i = 0; i < this.categories.length; i++) {
      const existingCategory = this.categories[i];
      if (existingCategory.category.ref === ref) {
        this.categories.splice(i, 1);
        break;
      }
    }
    this.closeEditor();
  }

  private categoryCreated(category: MenuCategoryGet) {
    this.categories.push({
      open: false,
      category: category
    })
    this.closeEditor();
  }

  private arrayMove(arr: {
    category: MenuCategoryGet,
    open: boolean
  }[], old_index: number, new_index: number
  ) {
    arr[old_index].category.elementOrder = arr[new_index].category.elementOrder;

    this.menuCategoryService.putCategory({
      restaurantRef: this.accountService.getRestaurantRef(),
      categoryRef: arr[old_index].category.ref,
      body: arr[old_index].category
    }).subscribe((_) => {
      this.loadCategories();
    });

    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  };

  dragDropListCaught(event: CdkDragDrop<string[]>) {
    if (event.previousIndex != event.currentIndex) {
      this.arrayMove(this.categories, event.previousIndex, event.currentIndex)
    }
  }

  createCategory() {
    const viewContainerRef = this.elementEditorHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(EditCategoryComponent);
  }
}
