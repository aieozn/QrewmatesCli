import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMenuRoutingModule } from './app-menu-routing.module';
import { AdminMenuComponent } from './admin-menu.component';
import { MenuCategoryItemsComponent } from './menu-category-items/menu-category-items.component';
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
import { MenuGroupItemsComponent } from './menu-category-items/menu-group-items/menu-group-items.component';
import { ElementEditorDirective } from './elementEditorDirective';
import { EditItemComponent } from './editors/edit-item/edit-item.component';


@NgModule({
  declarations: [
    AdminMenuComponent,
    MenuCategoryItemsComponent,
    EditCategoryComponent,
    EditItemGroupComponent,
    EditorCategoryDescriptionComponent,
    EditorCategoryNameComponent,
    EditorItemGroupDescriptionComponent,
    EditorItemGroupNameComponent,
    SubmitBarComponent,
    MenuGroupItemsComponent,
    ElementEditorDirective,
    EditItemComponent
  ],
  imports: [
    CommonModule,
    AppMenuRoutingModule,
    DragDropModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class AppMenuModule { }
