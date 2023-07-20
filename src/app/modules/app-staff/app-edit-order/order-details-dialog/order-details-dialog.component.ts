import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderDetailsGet } from '@common/api-client/models';
import { OrderDetailsComponent } from '../../../../common/order-composer/layout/order-details/order-details.component';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.scss']
})
export class OrderDetailsDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: {
      order: OrderDetailsGet
    },
    private dialogRef: MatDialogRef<OrderDetailsComponent>
  ) {
  }


  close() {
    this.dialogRef.close();
  }
}
