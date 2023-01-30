import { Injectable } from '@angular/core';
import { MenuItemGroupGet, OrderGet } from 'src/app/openapi-cli/models';
import { AboutUsComponent } from '../../layout/footer/about-us/about-us.component';
import { GenericDialogService } from 'src/app/shared/generic-dialog/service/generic-dialog.service';
import { OrderSummaryComponent } from 'src/app/shared/order-form/layout/order-summary/order-summary.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderElementDataWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-element-data-wrapper';
import { OrderService } from '../order/order.service';
import { first, Observable } from 'rxjs';
import { WaitForOrderDialogComponent } from '../../layout/wait-for-order-dialog/wait-for-order-dialog.component';
import { OrderWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-wrapper';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/layout/error-dialog/error-dialog.component';
import { ErrorDialogMessage } from 'src/app/shared/error-dialog/model/error-dialog-message';
import { AccountService } from 'src/app/shared/services/account/account.service';


@Injectable({
  providedIn: 'root'
})
export class GenericDialogCliManager {

  constructor(private dialogService: GenericDialogService,
    private accountService: AccountService,
    private dialog: MatDialog,
    private orderService: OrderService
  ) { }

  public openAboutUs() {
    // TODO fix AboutUsComponent title
    this.dialog.open(AboutUsComponent, GenericDialogService.getDefaultGenericDialogConfig({}))
  }

  public openAddItem(group: MenuItemGroupGet) : Observable<OrderElementDataWrapper[] | undefined> {
    return this.dialogService.openMenuItemComponent({
      group: group,
      item: undefined,
      restaurantRef: this.accountService.getRestaurantRef(),
      editMode: false
    }).afterClosed().pipe(first());
  }

  public openEditItem(group: MenuItemGroupGet, item: OrderElementDataWrapper) : Observable<OrderElementDataWrapper[] | undefined> {
    return this.dialogService.openMenuItemComponent({
      group: group,
      item: item,
      restaurantRef: this.accountService.getRestaurantRef(),
      editMode: true
    }).afterClosed().pipe(first());
  }

  public openSummary() : Observable<OrderWrapper> {
    // TODO fix title
    return this.dialog
      .open(OrderSummaryComponent, GenericDialogService.getDefaultGenericDialogConfig({
        restaurantRef: this.accountService.getRestaurantRef(),
        item: this.orderService.orderChanged.getValue()
      }))
      .afterClosed();
  }

  public openErrorDialog(message: ErrorDialogMessage) : Observable<void> {
    // TODO fix title
    return this.dialog
      .open(ErrorDialogComponent, {
        disableClose: true,
        data: message
      })
      .afterClosed();
  }

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
