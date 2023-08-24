import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusLineComponent } from './status-line/status-line.component';



@NgModule({
  declarations: [
    StatusLineComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StatusLineComponent
  ]
})
export class StatusLineModule { }
