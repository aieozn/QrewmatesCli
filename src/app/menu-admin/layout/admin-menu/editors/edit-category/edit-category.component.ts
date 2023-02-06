import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuCategoryData, MenuCategoryGet } from 'src/app/openapi-cli/models';
import { MenuCategoryControllerService } from 'src/app/openapi-cli/services';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { EditorDialogService } from '../editor-dialog.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent {

  public originalCategory: MenuCategoryGet | undefined;
  public activeCategory: MenuCategoryData;

  public categoryFields = {
    categoryName: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    categoryDescription: new FormControl('', [Validators.maxLength(512)]),
  };

  public constructor(
    private editDialogService: EditorDialogService,
    private categoryService: MenuCategoryControllerService,
    private accountService: AccountService
  ) {
    this.activeCategory = {
      description: '',
      elementOrder: 9999,
      name: ''
    }
  }

  @Input() set category(value: MenuCategoryGet) {
    this.originalCategory = value;
    this.activeCategory = JSON.parse(JSON.stringify(value));

    this.loadCategoryFieldsValues(value);
  }

  private loadCategoryFieldsValues(value: MenuCategoryGet) {
    this.categoryFields.categoryName.setValue(value.name);
    this.categoryFields.categoryDescription.setValue(value.description ?? null);
  }

  public isValid(validation: {[key: string] : FormControl}) : boolean {
    return !Object.values(validation).map(e => e.invalid).includes(true);
  }

  public isUpdated(validation: {[key: string] : FormControl}) : boolean {
    return Object.values(validation).map(e => e.dirty).includes(true);
  }

  public onSave() {
    this.activeCategory.name = this.categoryFields.categoryName.value!;
    this.activeCategory.description = this.categoryFields.categoryDescription.value ?? undefined;

    if (this.originalCategory !== undefined) {
      this.categoryService.putCategory({
        restaurantRef: this.accountService.getRestaurantRef(),
        categoryRef: this.originalCategory.ref,
        body: this.activeCategory
      }).subscribe(saved => {
        this.editDialogService.categoryUpdated(saved);
      })
    } else {
      this.categoryService.postCategory({
        restaurantRef: this.accountService.getRestaurantRef(),
        body: this.activeCategory
      }).subscribe(saved => {
        this.editDialogService.categoryCreated(saved);
      })
    }
  }

  public cancel() {
    this.editDialogService.closeDialog();
  }

  public onDelete() {
    if (this.originalCategory !== undefined) {
      let originalCategoryRef = this.originalCategory.ref;

      this.categoryService.deleteCategory({
        restaurantRef: this.accountService.getRestaurantRef(),
        categoryRef: originalCategoryRef
      }).subscribe(_ => {
        this.editDialogService.categoryDeleted(originalCategoryRef)
      })
    } else {
      this.editDialogService.closeDialog();
      console.error('Category not defined');
    }
  }
}
