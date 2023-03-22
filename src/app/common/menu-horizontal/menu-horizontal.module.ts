import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuHorizontalElementComponent } from './layout/menu-horizontal/menu-horizontal-element/menu-horizontal-element.component';
import { MenuHorizontalComponent } from './layout/menu-horizontal/menu-horizontal.component';
import { MenuHorizontalElementWrapperComponent } from './layout/content/menu-horizontal-element-wrapper/menu-horizontal-element-wrapper.component';
import { MenuHorizontalWrapperComponent } from './layout/content/menu-horizontal-wrapper/menu-horizontal-wrapper.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    MenuHorizontalElementComponent,
    MenuHorizontalComponent,
    MenuHorizontalElementWrapperComponent,
    MenuHorizontalWrapperComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    MenuHorizontalComponent,
    MenuHorizontalElementWrapperComponent,
    MenuHorizontalWrapperComponent
  ]
})
export class MenuHorizontalModule { }
