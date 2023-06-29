import { Injectable } from '@angular/core';
import { FooterAboutUsComponent } from '../../../../modules/app-client/layout/footer/footer-about-us/footer-about-us.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderElementDataWrapper } from '@common/api-client/wrapper/order-element-data-wrapper';
import { first, Observable } from 'rxjs';
import { MenuItemGroupGet } from '@common/api-client/models';
import { FullWidthDialogService } from '@common/full-width-dialog/service/full-width-dialog.service';
import { AccountService } from '@common/account-utils/services/account.service';
import { OrderSummaryComponent } from '@common/order-composer/layout/order-summary/order-summary.component';
import { ErrorDialogMessage } from '../../../../modules/app-client/layout/error-dialog/model/error-dialog-message';
import { ErrorDialogComponent } from '../../../../modules/app-client/layout/error-dialog/layout/error-dialog/error-dialog.component';
import { OrderSummaryOutputData } from '@common/order-composer/layout/order-summary/order-summary-output-data';
import { OrderService } from 'app/common/restaurant-menu/services/order/order.service';


@Injectable({
  providedIn: 'root'
})
export class GenericDialogCliManager {

  constructor(private dialogService: FullWidthDialogService,
    private accountService: AccountService,
    private dialog: MatDialog,
    private orderService: OrderService
  ) { }

  openAboutUs() {
    // TODO fix AboutUsComponent title
    this.dialog.open(FooterAboutUsComponent, FullWidthDialogService.getDefaultGenericDialogConfig({}))
  }

  openAddItem(group: MenuItemGroupGet) : Observable<OrderElementDataWrapper[] | undefined> {
    return this.dialogService.openMenuItemComponent({
      group: group,
      item: undefined,
      restaurantRef: this.accountService.getRestaurantRef(),
      editMode: false
    }).afterClosed().pipe(first());
  }

  openEditItem(group: MenuItemGroupGet, item: OrderElementDataWrapper) : Observable<OrderElementDataWrapper[] | undefined> {
    return this.dialogService.openMenuItemComponent({
      group: group,
      item: item,
      restaurantRef: this.accountService.getRestaurantRef(),
      editMode: true
    }).afterClosed().pipe(first());
  }

  openSummary() : Observable<OrderSummaryOutputData> {
    console.log("OPEN")
    console.log(this.orderService.orderChanged.getValue())
    // TODO fix title
    return this.dialog
      .open(OrderSummaryComponent, FullWidthDialogService.getDefaultGenericDialogConfig({
        restaurantRef: this.accountService.getRestaurantRef(),
        item: this.orderService.orderChanged.getValue(),
        waiterMode: false
      }))
      .afterClosed();
  }

  openErrorDialog(message: ErrorDialogMessage) : Observable<void> {
    // TODO fix title
    return this.dialog
      .open(ErrorDialogComponent, {
        disableClose: true,
        data: message
      })
      .afterClosed();
  }
}
