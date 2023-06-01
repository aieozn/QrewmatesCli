import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuCategoryGet } from '@common/api-client/models';
import { MenuCategoryControllerService } from '@common/api-client/services';
import { EditorDialogService } from '../editors/editor-dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-menu-categories',
  templateUrl: './admin-menu-categories.component.html',
  styleUrls: ['../shared-css/menu-element-drag-drop-list.scss', './admin-menu-categories.component.scss']
})
export class AdminMenuCategoriesComponent implements OnDestroy {
  private readonly onDestroy = new Subject<void>();
  
  categories: MenuCategoryGet[] = [];

  constructor(
    private menuCategoryService: MenuCategoryControllerService,
    private accountService: AccountService,
    private editorDialogService: EditorDialogService,
    private router: Router
  ) {
    this.loadCategories();

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
  }

  private categoryDeleted(ref: string) {
    for (let i = 0; i < this.categories.length; i++) {
      const existingCategory = this.categories[i];
      if (existingCategory.ref === ref) {
        this.categories.splice(i, 1);
        break;
      }
    }
  }

  private categoryCreated(category: MenuCategoryGet) {
    this.categories.push(category)
  }

  moveUp(category: MenuCategoryGet) {
    const activeIndex = this.categories.indexOf(category)

    this.menuCategoryService.moveUp4({
      restaurantRef: this.accountService.getRestaurantRef(),
      categoryRef: category.ref
    }).pipe(
      tap(e => {
        this.categories[activeIndex] = this.categories[activeIndex + 1];
        this.categories[activeIndex + 1] = e;
      })
    ).subscribe();
  }

  moveDown(category: MenuCategoryGet) {
    const activeIndex = this.categories.indexOf(category)

    this.menuCategoryService.moveDown4({
      restaurantRef: this.accountService.getRestaurantRef(),
      categoryRef: category.ref
    }).pipe(
      tap(e => {
        this.categories[activeIndex] = this.categories[activeIndex - 1];
        this.categories[activeIndex - 1] = e;
      })
    ).subscribe();
  }
}
