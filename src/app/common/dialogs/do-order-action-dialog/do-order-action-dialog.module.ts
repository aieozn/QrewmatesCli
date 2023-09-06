import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DoOrderActionDialogComponent } from './do-order-action-dialog/do-order-action-dialog.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    DoOrderActionDialogComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    TextFieldModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    DoOrderActionDialogComponent
  ]
})
export class DoOrderActionDialogModule { }
