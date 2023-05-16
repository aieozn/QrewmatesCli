import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuCategoryGet } from '@common/api-client/models';
import { MenuCategoryControllerService } from '@common/api-client/services';
import { EditCategoryComponent } from '../editors/edit-category/edit-category.component';
import { EditorDialogService } from '../editors/editor-dialog.service';
import { ElementEditorDirective } from '../elementEditorDirective';

@Component({
  selector: 'app-admin-menu-categories',
  templateUrl: './admin-menu-categories.component.html',
  styleUrls: ['../menu-element-drag-drop-list.scss', './admin-menu-categories.component.scss']
})
export class AdminMenuCategoriesComponent implements OnDestroy {
  private readonly onDestroy = new Subject<void>();
  
  @ViewChild(ElementEditorDirective, {static: true}) elementEditorHost!: ElementEditorDirective;
  
  categories: MenuCategoryGet[] = [];

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
  }

  private loadCategories() {
    this.menuCategoryService.getCategories({
      restaurantRef: this.accountService.getRestaurantRef()
    }).subscribe(loadedCategories => this.categories = loadedCategories)
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
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private categoryUpdated(newCategory: MenuCategoryGet) {
    for (let i = 0; i < this.categories.length; i++) {
      const existingCategory = this.categories[i];
      if (existingCategory.ref === newCategory.ref) {
        this.categories[i] = newCategory;
        break;
      }
    }
    this.closeEditor();
  }

  private categoryDeleted(ref: string) {
    for (let i = 0; i < this.categories.length; i++) {
      const existingCategory = this.categories[i];
      if (existingCategory.ref === ref) {
        this.categories.splice(i, 1);
        break;
      }
    }
    this.closeEditor();
  }

  private categoryCreated(category: MenuCategoryGet) {
    this.categories.push(category)
    this.closeEditor();
  }

  private arrayMove(arr: MenuCategoryGet[], old_index: number, new_index: number
  ) {
    arr[old_index].elementOrder = arr[new_index].elementOrder;

    this.menuCategoryService.putCategory({
      restaurantRef: this.accountService.getRestaurantRef(),
      categoryRef: arr[old_index].ref,
      body: arr[old_index]
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
