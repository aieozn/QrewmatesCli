import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MenuCategoryGet } from 'src/app/openapi-cli/models';
import { MenuCategoryControllerService } from 'src/app/openapi-cli/services';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { EditCategoryComponent } from './editors/edit-category/edit-category.component';
import { EditorDialogService } from './editors/editor-dialog.service';
import { ElementEditorDirective } from './elementEditorDirective';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss', './menu-element-drag-drop-list.scss']
})
export class AdminMenuComponent implements OnDestroy {

  private readonly onDestroy = new Subject<void>();
  
  @ViewChild(ElementEditorDirective, {static: true}) elementEditorHost!: ElementEditorDirective;
  
  public categories: {
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
  }

  private loadCategories() {
    this.menuCategoryService.getCategories({
      restaurantRef: this.accountService.getRestaurantRef()
    }).subscribe(loadedCategories => {
      this.categories = [];
      for (let loadedCategory of loadedCategories) {
        this.categories.push({
          category: loadedCategory,
          open: false
        })
      }
    })
  }

  public extendCategory(category: MenuCategoryGet) {
    this.closeCategories();
    this.categories.filter(e => e.category.ref === category.ref)[0].open = true;
  }

  public closeCategories() {
    for (let category of this.categories) {
      category.open = false;
    }
  }

  public closeEditor() {
    const viewContainerRef = this.elementEditorHost.viewContainerRef;
    viewContainerRef.clear();
  }

  public editCategory(category: MenuCategoryGet) {

    const viewContainerRef = this.elementEditorHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(EditCategoryComponent);
    componentRef.instance.category = category;
    // componentRef.instance.data = adItem.data;
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private categoryUpdated(newCategory: MenuCategoryGet) {
    for (let i = 0; i < this.categories.length; i++) {
      let existingCategory = this.categories[i];
      if (existingCategory.category.ref === newCategory.ref) {
        this.categories[i].category = newCategory;
        break;
      }
    }
    this.closeEditor();
  }

  private categoryDeleted(ref: string) {
    for (let i = 0; i < this.categories.length; i++) {
      let existingCategory = this.categories[i];
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
    arr[old_index].category.elementOrder = new_index + 1;

      this.menuCategoryService.putCategory({
        restaurantRef: this.accountService.getRestaurantRef(),
        categoryRef: arr[old_index].category.ref,
        body: arr[old_index].category
      }).subscribe((_) => {
        this.loadCategories();
      });

      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);

      for (let i = 0; i < arr.length; i ++) {
        let categoryOrder = i + 1;
        let category = arr[i];
        category.category.elementOrder = categoryOrder;
      }
  };

  public dragDropListCaught(event: CdkDragDrop<string[]>) {
    this.arrayMove(this.categories, event.previousIndex, event.currentIndex)

    // this.menuCategoryService.putCategory()

  }
}
