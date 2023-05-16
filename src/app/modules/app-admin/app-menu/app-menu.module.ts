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
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ElementEditorDirective } from './elementEditorDirective';
import { EditItemComponent } from './editors/edit-item/edit-item.component';
import { ToppingsComponent } from './editors/edit-item/toppings/toppings.component';
import { SelectsComponent } from './editors/edit-item/selects/selects.component';
import { AllergensComponent } from './editors/edit-item/allergens/allergens.component';
import { SettingsComponent } from './editors/edit-item/settings/settings.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AdminMenuCategoriesComponent } from './admin-menu-categories/admin-menu-categories.component';
import { AdminMenuCategoryComponent } from './admin-menu-category/admin-menu-category.component';
import { AdminMenuItemGroupComponent } from './admin-menu-item-group/admin-menu-item-group.component';


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
    ToppingsComponent,
    SelectsComponent,
    AllergensComponent,
    SettingsComponent,
    AdminMenuCategoriesComponent,
    AdminMenuCategoryComponent,
    AdminMenuItemGroupComponent,
  ],
  imports: [
    CommonModule,
    AppMenuRoutingModule,
    DragDropModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ]
})
export class AppMenuModule { }
