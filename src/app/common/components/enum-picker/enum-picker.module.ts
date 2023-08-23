import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnumPickerComponent } from './enum-picker/enum-picker.component';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
    EnumPickerComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule
  ],
  exports: [
    EnumPickerComponent
  ]
})
export class EnumPickerModule { }
