import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuCategoryGet } from '@common/api-client/models';
import { MenuCategoryControllerService } from '@common/api-client/services';
import { EditorDialogService } from '../editor-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, catchError, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html'
})
export class EditCategoryComponent implements OnDestroy {

  category: MenuCategoryGet | undefined;
  private readonly onDestroy = new Subject<void>();

  emptyCategory = {
    description: '',
    name: ''
  };
  detailsLink: string[] | undefined
  
  categoryFields = {
    categoryName: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    categoryDescription: new FormControl('', [Validators.maxLength(512)]),
  };

  constructor(
    private editDialogService: EditorDialogService,
    private categoryService: MenuCategoryControllerService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.pipe(
      tap(params => this.reloadComponent(params['categoryRef'])),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  private reloadComponent(categoryRef: string) {
    if (categoryRef) {
      this.categoryService.getCategory({
        restaurantRef: this.accountService.getRestaurantRef(),
        categoryRef: categoryRef
      }).pipe(
        tap(category => this.loadCategoryFieldsValues(category)),
        tap(category => this.detailsLink = ['/admin/menu/category/', category.ref]),
        catchError(() => {
          this.close()
          throw 'Failed to load category detials'
        })
      ).subscribe()
    }
  }

  private loadCategoryFieldsValues(value: MenuCategoryGet) {
    this.category = value
    this.categoryFields.categoryName.setValue(value.name);
    this.categoryFields.categoryDescription.setValue(value.description ?? null);
  }

  isValid(validation: {[key: string] : FormControl}) : boolean {
    return !Object.values(validation).map(e => e.invalid).includes(true);
  }

  isUpdated(validation: {[key: string] : FormControl}) : boolean {
    return Object.values(validation).map(e => e.dirty).includes(true);
  }

  close() {
    this.router.navigate(['/admin/menu/categories'])
  }

  onSave() {
    if (this.category !== undefined) {
      this.categoryService.putCategory({
        restaurantRef: this.accountService.getRestaurantRef(),
        categoryRef: this.category.ref,
        body: {
          name: this.categoryFields.categoryName.value!,
          description: this.categoryFields.categoryDescription.value ?? undefined
        }
      }).subscribe(saved => {
        this.editDialogService.onCategoryUpdated.next(saved);
        this.close();
      })
    } else {
      this.categoryService.postCategory({
        restaurantRef: this.accountService.getRestaurantRef(),
        body: {
          name: this.categoryFields.categoryName.value!,
          description: this.categoryFields.categoryDescription.value ?? undefined
        }
      }).subscribe(saved => {
        this.editDialogService.onCategoryCreated.next(saved);
        this.close();
      })
    }
  }

  onTrySave() {
    this.categoryFields.categoryName.markAllAsTouched();
    this.categoryFields.categoryDescription.markAllAsTouched();
  }

  onDelete() {
    if (this.category !== undefined) {
      const originalCategoryRef = this.category.ref;

      if (confirm($localize`Are you sure you want to delete this category?`)) {
        this.categoryService.deleteCategory({
          restaurantRef: this.accountService.getRestaurantRef(),
          categoryRef: originalCategoryRef
        }).subscribe(_ => {
          this.editDialogService.onCategoryDeleted.next(originalCategoryRef)
          this.close()
        })
      }
      
    } else {
      console.error('Category not defined');
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
