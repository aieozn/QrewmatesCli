import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingOrderComponent } from './pending-order/pending-order.component';
import { MatIconModule } from '@angular/material/icon';
import { DoOrderActionDialogModule } from '../dialogs/do-order-action-dialog/do-order-action-dialog.module';


@NgModule({
  declarations: [
    PendingOrderComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    DoOrderActionDialogModule
  ],
  exports: [
    PendingOrderComponent
  ]
})
export class PendingOrderModule { }
