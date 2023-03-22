import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullWidthDialogComponent } from './layout/full-width-dialog/full-width-dialog.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    FullWidthDialogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    FullWidthDialogComponent
  ]
})
export class FullWidthDialogModule { }
