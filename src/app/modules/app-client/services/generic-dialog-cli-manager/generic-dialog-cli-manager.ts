import { Injectable } from '@angular/core';
import { FooterAboutUsComponent } from '../../layout/footer/footer-about-us/footer-about-us.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderElementDataWrapper } from 'src/app/common/api-client/wrapper/order-element-data-wrapper';
import { OrderService } from '../order/order.service';
import { first, Observable } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/modules/app-client/layout/error-dialog/layout/error-dialog/error-dialog.component';
import { ErrorDialogMessage } from 'src/app/modules/app-client/layout/error-dialog/model/error-dialog-message';
import { MenuItemGroupGet } from 'src/app/common/api-client/models';
import { FullWidthDialogService } from 'src/app/common/full-width-dialog/service/full-width-dialog.service';
import { AccountService } from 'src/app/common/account-utils/services/account.service';
import { OrderWrapper } from 'src/app/common/api-client/wrapper/order-wrapper';
import { OrderSummaryComponent } from 'src/app/common/order-composer/layout/order-summary/order-summary.component';


@Injectable({
  providedIn: 'root'
})
export class GenericDialogCliManager {

  constructor(private dialogService: FullWidthDialogService,
    private accountService: AccountService,
    private dialog: MatDialog,
    private orderService: OrderService
  ) { }

  public openAboutUs() {
    // TODO fix AboutUsComponent title
    this.dialog.open(FooterAboutUsComponent, FullWidthDialogService.getDefaultGenericDialogConfig({}))
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
      .open(OrderSummaryComponent, FullWidthDialogService.getDefaultGenericDialogConfig({
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
}
