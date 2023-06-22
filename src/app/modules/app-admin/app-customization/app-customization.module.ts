import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCustomizationRoutingModule } from './app-customization-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { AdminCustomizationComponent } from './admin-customization.component';
import { BackgroundPhotoCustomizationComponent } from './background-photo-customization/background-photo-customization.component'
import { ColorsCustomizationComponent } from './colors-customization/colors-customization.component';
import { LogoCustomizationComponent } from './logo-customization/logo-customization.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { QrTemplateCustomizationComponent } from './qr-template-customization/qr-template-customization.component';
import { SelectThemeDialogComponent } from './dialog/select-theme-dialog/select-theme-dialog.component';
import { ComplexEditorModule } from 'app/common/complex-editor/complex-editor.module';

@NgModule({
  declarations: [
    AdminCustomizationComponent,
    BackgroundPhotoCustomizationComponent,
    ColorsCustomizationComponent,
    LogoCustomizationComponent,
    QrTemplateCustomizationComponent,
    SelectThemeDialogComponent
  ],
  imports: [
    CommonModule,
    AppCustomizationRoutingModule,
    MatIconModule,
    ColorPickerModule,
    ComplexEditorModule
  ]
})
export class AppCustomizationModule { }
