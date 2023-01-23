import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DoOrderActionDialogComponent } from '../../layout/menu-staff/do-order-action-dialog/do-order-action-dialog.component';
import { AcceptOrderActionDialogType } from './accept-order-aciton-dialog-type';

@Injectable({
  providedIn: 'root'
})
export class GenericDialogStuffManagerService {

  constructor(private dialog: MatDialog) { }

  public openAcceptOrderActionDialog(type: AcceptOrderActionDialogType) {
    return this.dialog
      .open(DoOrderActionDialogComponent, {
        disableClose: true,
        width: "100%",
        data: {
          type: type
        }
      }).afterClosed();
  }
}
