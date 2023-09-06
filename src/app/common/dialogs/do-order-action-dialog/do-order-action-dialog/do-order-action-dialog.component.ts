import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AcceptOrderActionDialogType } from 'app/common/services/manage-order-status/model/accept-order-aciton-dialog-type';
import { AcceptOrderActionResult } from 'app/common/services/manage-order-status/model/accept-order-action-result';

@Component({
  selector: 'app-do-order-action-dialog',
  templateUrl: './do-order-action-dialog.component.html',
  styleUrls: ['./do-order-action-dialog.component.scss']
})
export class DoOrderActionDialogComponent {
  textAreaValue = '';

  constructor(
    public dialogRef: MatDialogRef<DoOrderActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : {
    type: AcceptOrderActionDialogType
    })
  {

  }

  onChange(event: any | null) {
    if (event && event.target !== null && event.target.value) {
      this.textAreaValue = event.target.value;
    } else {
      this.textAreaValue = '';
    }
  }

  proceed() {
    this.doClose({
      proceed: true,
      message: this.textAreaValue ? this.textAreaValue : undefined
    })
  }

  cancel() {
    this.doClose({
      proceed: false,
      message: undefined
    })
  }

  doClose(result: AcceptOrderActionResult) {
    this.dialogRef.close(result);
  }
}
