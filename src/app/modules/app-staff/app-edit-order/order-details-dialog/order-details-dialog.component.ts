import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderDetailsGet } from '@common/api-client/models';
import { ManageOrderStatusService } from 'app/common/services/manage-order-status/manage-order-status.service';
import { UserAction } from 'app/common/translators';

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
    private dialogRef: MatDialogRef<OrderDetailsDialogComponent>,
    private manageOrderStatusService: ManageOrderStatusService
  ) {
  }

  closeWithAction(action: UserAction) {
    this.manageOrderStatusService.handleAction(this.data.order.restaurantRef, this.data.order.ref, action);
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close()
  }
}
