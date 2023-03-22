import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCustomizationRoutingModule } from './app-customization-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { AdminCustomizationComponent } from './admin-customization.component';
import { BackgroundPhotoCustomizationComponent } from './background-photo-customization/background-photo-customization.component'
import { ColorsCustomizationComponent } from './colors-customization/colors-customization.component';
import { LogoCustomizationComponent } from './logo-customization/logo-customization.component';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [
    AdminCustomizationComponent,
    BackgroundPhotoCustomizationComponent,
    ColorsCustomizationComponent,
    LogoCustomizationComponent
  ],
  imports: [
    CommonModule,
    AppCustomizationRoutingModule,
    MatIconModule,
    ColorPickerModule
  ]
})
export class AppCustomizationModule { }
