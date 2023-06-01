import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMenuRoutingModule } from './app-menu-routing.module';
import { EditCategoryComponent } from './editors/edit-category/edit-category.component';
import { EditItemGroupComponent } from './editors/edit-item-group/edit-item-group.component';
import { EditorCategoryDescriptionComponent } from './editors/field-editors/editor-category-description/editor-category-description.component';
import { EditorCategoryNameComponent } from './editors/field-editors/editor-category-name/editor-category-name.component';
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
import { EditItemAllergensComponent } from './editors/edit-item/edit-item-allergens/edit-item-allergens.component';
import { EditItemSettingsComponent } from './editors/edit-item/edit-item-settings/edit-item-settings.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AdminMenuCategoriesComponent } from './admin-menu-categories/admin-menu-categories.component';
import { AdminMenuCategoryComponent } from './admin-menu-category/admin-menu-category.component';
import { AdminMenuItemGroupComponent } from './admin-menu-item-group/admin-menu-item-group.component';
import { AdminMenuItemSelectCollectionComponent } from './admin-menu-item-select-collection/admin-menu-item-select-collection.component';
import { EditorItemNameComponent } from './editors/field-editors/editor-item-name/editor-item-name.component';


@NgModule({
  declarations: [
    EditCategoryComponent,
    EditItemGroupComponent,
    EditorCategoryDescriptionComponent,
    EditorCategoryNameComponent,
    EditorItemGroupDescriptionComponent,
    EditorItemGroupNameComponent,
    SubmitBarComponent,
    ElementEditorDirective,
    EditItemComponent,
    EditItemToppingsComponent,
    EditItemSelectsComponent,
    EditItemAllergensComponent,
    EditItemSettingsComponent,
    AdminMenuCategoriesComponent,
    AdminMenuCategoryComponent,
    AdminMenuItemGroupComponent,
    AdminMenuItemSelectCollectionComponent,
    EditorItemNameComponent,
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
