import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { OrderGet } from 'src/app/common/api-client/models';
import { WaitForOrderDialogComponent } from '../../layout/wait-for-order-dialog/wait-for-order-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogManagerService {

  constructor(private dialog: MatDialog) { }

  public openWaitForOrderDialog(restaurantRef: string, orderRef: string) : Observable<OrderGet> {
    return this.dialog
      .open(WaitForOrderDialogComponent, {
        disableClose: true,
        width: "100%",
        data: {
          restaurantRef: restaurantRef,
          orderRef: orderRef
        }
      }).afterClosed();
  }
}
