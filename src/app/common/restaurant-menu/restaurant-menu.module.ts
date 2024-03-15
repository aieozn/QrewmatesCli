import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCategoryComponent } from './menu-category/menu-category.component';
import { MenuItemGroupComponent } from './menu-category/menu-item-group/menu-item-group.component';
import { MenuItemGroupLoaderComponent } from './menu-item-group-loader/menu-item-group-loader.component';
import { ContentLoaderModule } from '../components/content-loader/content-loader.module';

@NgModule({
  declarations: [
    MenuCategoryComponent,
    MenuItemGroupComponent,
    MenuItemGroupLoaderComponent
  ],
  imports: [
    CommonModule,
    ContentLoaderModule
  ],
  exports: [
    MenuCategoryComponent,
    MenuItemGroupComponent,
    MenuItemGroupLoaderComponent
  ]
})
export class RestaurantMenuModule { }
