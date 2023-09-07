import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCategoryComponent } from './menu-category/menu-category.component';
import { MenuItemGroupComponent } from './menu-category/menu-item-group/menu-item-group.component';
import { RestaurantMenuDialogManager } from './services/dialog-manager/restaurant-menu-dialog-manager';

export const RESTAURANT_MENU_DIALOG_MANAGER_TOKEN = new InjectionToken<RestaurantMenuDialogManager>('RESTAURANT_MENU_DIALOG_MANAGER_TOKEN');

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
