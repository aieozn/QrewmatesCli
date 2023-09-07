import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCategoryComponent } from './menu-category/menu-category.component';
import { MenuItemGroupComponent } from './menu-category/menu-item-group/menu-item-group.component';

@NgModule({
  declarations: [
    MenuCategoryComponent,
    MenuItemGroupComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuCategoryComponent
  ]
})
export class RestaurantMenuModule { }
