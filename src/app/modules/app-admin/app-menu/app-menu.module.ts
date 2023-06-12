import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMenuRoutingModule } from './app-menu-routing.module';
import { EditCategoryComponent } from './editors/edit-category/edit-category.component';
import { EditItemGroupComponent } from './editors/edit-item-group/edit-item-group.component';
import { EditorItemGroupDescriptionComponent } from './editors/field-editors/editor-item-group-description/editor-item-group-description.component';
import { EditorItemGroupNameComponent } from './editors/field-editors/editor-item-group-name/editor-item-group-name.component';
import { SubmitBarComponent } from './editors/submit-bar/submit-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ElementEditorDirective } from './elementEditorDirective';
import { EditItemComponent } from './editors/edit-item/edit-item.component';
import { EditItemToppingsComponent } from './editors/edit-item/edit-item-toppings/edit-item-toppings.component';
import { EditItemSelectsComponent } from './editors/edit-item/edit-item-selects/edit-item-selects.component';
import { EditItemSettingsComponent } from './editors/edit-item/edit-item-settings/edit-item-settings.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AdminMenuCategoriesComponent } from './admin-menu-categories/admin-menu-categories.component';
import { AdminMenuCategoryComponent } from './admin-menu-category/admin-menu-category.component';
import { AdminMenuItemGroupComponent } from './admin-menu-item-group/admin-menu-item-group.component';
import { EditorItemNameComponent } from './editors/field-editors/editor-item-name/editor-item-name.component';
import { EditorItemPriceComponent } from './editors/field-editors/editor-item-price/editor-item-price.component';
import { EditItemGroupAggregateComponent } from './editors/edit-item-group-aggregate/edit-item-group-aggregate.component';
import { EditItemGroupAggregateSettingsComponent } from './editors/edit-item-group-aggregate/edit-item-group-aggregate-settings/edit-item-group-aggregate-settings.component';
import { EditorItemGroupImageComponent } from './editors/field-editors/editor-item-group-image/editor-item-group-image.component';
import { AdminMenuAllergensComponent } from './admin-menu-allergens/admin-menu-allergens.component';
import { EditAllergenComponent } from './editors/edit-allergen/edit-allergen.component';
import { EditorFormTextComponent } from './editors/field-editors/editor-form-text/editor-form-text.component';
import { AdminMenuSelectCollectionsComponent } from './admin-menu-select-collections/admin-menu-select-collections.component';
import { AdminMenuSelectCollectionComponent } from './admin-menu-select-collection/admin-menu-select-collection.component';
import { EditSelectCollectionComponent } from './editors/edit-select-collection/edit-select-collection.component';
import { EditSelectComponent } from './editors/edit-select/edit-select.component';
import { EditAllergensComponent } from './editors/edit-allergens/edit-allergens.component';

@NgModule({
  declarations: [
    EditCategoryComponent,
    EditItemGroupComponent,
    EditorItemGroupDescriptionComponent,
    EditorItemGroupNameComponent,
    SubmitBarComponent,
    ElementEditorDirective,
    EditItemComponent,
    EditItemToppingsComponent,
    EditItemSelectsComponent,
    EditAllergenComponent,
    EditItemSettingsComponent,
    AdminMenuCategoriesComponent,
    AdminMenuCategoryComponent,
    AdminMenuItemGroupComponent,
    EditorItemNameComponent,
    EditorItemPriceComponent,
    EditItemGroupAggregateComponent,
    EditItemGroupAggregateSettingsComponent,
    EditorItemGroupImageComponent,
    AdminMenuAllergensComponent,
    EditorFormTextComponent,
    AdminMenuSelectCollectionsComponent,
    AdminMenuSelectCollectionComponent,
    EditSelectCollectionComponent,
    EditSelectComponent,
    EditAllergensComponent
  ],
  imports: [
    CommonModule,
    AppMenuRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ]
})
export class AppMenuModule { }
