import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { OrderGet } from '@common/api-client/models';
import { WaitForOrderDialogComponent } from '../../layout/wait-for-order-dialog/wait-for-order-dialog.component';
import { FooterAboutUsComponent } from '../../layout/footer/footer-about-us/footer-about-us.component';
import { OrderComposerDialogManagerMobile } from 'app/common/services/dialog-manager/mobile/order-composer-dialog-manager-mobile.service';

@Injectable({
  providedIn: 'root'
})
export class DialogManagerService {

  constructor(private dialog: MatDialog) { }

  openWaitForOrderDialog(restaurantRef: string, orderRef: string) : Observable<OrderGet> {
    return this.dialog
      .open(WaitForOrderDialogComponent, {
        disableClose: true,
        data: {
          restaurantRef: restaurantRef,
          orderRef: orderRef
        }
      }).afterClosed();
  }

  openAboutUs() : Observable<OrderGet> {
    return this.dialog.open(FooterAboutUsComponent, OrderComposerDialogManagerMobile.getDefaultGenericDialogConfig({})).afterClosed();
  }
}
