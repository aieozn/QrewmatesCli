import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderDetailsGet } from '@common/api-client/models';
import { OrderDetailsDialogResponse } from  './order-details-dialog-response'
import { UserActions } from 'app/common/translators';

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
    private dialogRef: MatDialogRef<OrderDetailsDialogComponent>
  ) {
  }

  closeWithAction(action: UserActions) {
    const result: OrderDetailsDialogResponse = {
      doAction: action
    }
    this.dialogRef.close(result);
  }

  close() {
    this.dialogRef.close()
  }
}
