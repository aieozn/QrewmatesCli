import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AcceptOrderActionDialogType } from '../../services/generic-dialog-stuff-manager/accept-order-aciton-dialog-type';
import { AcceptOrderActionResult } from '../../services/generic-dialog-stuff-manager/accept-order-action-result';

@Component({
  selector: 'app-do-order-action-dialog',
  templateUrl: './do-order-action-dialog.component.html',
  styleUrls: ['./do-order-action-dialog.component.scss']
})
export class DoOrderActionDialogComponent {

  public acceptOrderActionDialogTypeEnum = AcceptOrderActionDialogType;
  public textAreaValue = '';

  constructor(
    public dialogRef: MatDialogRef<DoOrderActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : {
    type: AcceptOrderActionDialogType
    })
  {

  }

  public onChange(event: any | null) {
    if (event && event.target !== null && event.target.value) {
      this.textAreaValue = event.target.value;
    } else {
      this.textAreaValue = '';
    }
  }

  public proceed() {
    this.doClose({
      proceed: true,
      message: this.textAreaValue ? this.textAreaValue : undefined
    })
  }

  public cancel() {
    this.doClose({
      proceed: false,
      message: undefined
    })
  }

  public doClose(result: AcceptOrderActionResult) {
    this.dialogRef.close(result);
  }
}
