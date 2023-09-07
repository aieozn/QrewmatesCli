import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderElementDataWrapper } from '@common/api-client/wrapper/order-element-data-wrapper';
import { first, Observable } from 'rxjs';
import { MenuItemGroupGet } from '@common/api-client/models';
import { FullWidthDialogService } from '@common/full-width-dialog/service/full-width-dialog.service';
import { AccountService } from '@common/account-utils/services/account.service';
import { OrderService } from 'app/common/restaurant-menu/services/order/order.service';
import { OrderSummaryOutputData } from '@common/order-composer/layout/order-summary/order-summary-output-data';
import { OrderSummaryComponent } from '@common/order-composer/layout/order-summary/order-summary.component';


@Injectable({
  providedIn: 'root'
})
export class StaffDialogService {

  constructor(private dialogService: FullWidthDialogService,
    private accountService: AccountService,
    private dialog: MatDialog,
    private orderService: OrderService
  ) { }

  openAddItem(group: MenuItemGroupGet) : Observable<OrderElementDataWrapper[] | undefined> {
    return this.dialogService.openMenuItemComponentMobile({
      group: group,
      item: undefined,
      restaurantRef: this.accountService.getRestaurantRef(),
      editMode: false
    }).afterClosed().pipe(first());
  }

  openEditItem(group: MenuItemGroupGet, item: OrderElementDataWrapper) : Observable<OrderElementDataWrapper[] | undefined> {
    return this.dialogService.openMenuItemComponentMobile({
      group: group,
      item: item,
      restaurantRef: this.accountService.getRestaurantRef(),
      editMode: true
    }).afterClosed().pipe(first());
  }

  openSummary() : Observable<OrderSummaryOutputData> {
    // TODO fix title
    return this.dialog
      .open(OrderSummaryComponent, FullWidthDialogService.getDefaultMobileGenericDialogConfig({
        restaurantRef: this.accountService.getRestaurantRef(),
        item: this.orderService.orderChanged.getValue(),
        waiterMode: false,
        submitButtonText: $localize`Save`
      }))
      .afterClosed();
  }
}
