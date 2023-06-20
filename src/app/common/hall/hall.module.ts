import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HallComponent } from './hall/hall.component';



@NgModule({
  declarations: [
    HallComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HallComponent,
  ]
})
export class HallModule { }
