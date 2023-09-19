import { OrderElementDataWrapper } from '@common/api-client/wrapper/order-element-data-wrapper';
import { Observable, first } from 'rxjs';
import { MenuItemGroupGet } from '@common/api-client/models';
import { Injectable } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { OrderService } from '../order/order.service';
import { OrderSummaryOutputData } from '@common/order-composer/layout/order-summary/order-summary-output-data';
import { OrderComposerDialogManager } from '@common/order-composer/services/order-composer-dialog-manager.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantMenuDialogManager {

  constructor(
    private dialogManager: OrderComposerDialogManager,
    private accountService: AccountService,
    private orderService: OrderService
  ) {
  }

  openAddItem(group: MenuItemGroupGet) : Observable<OrderElementDataWrapper[] | undefined> {
    return this.dialogManager.openMenuItemComponent({
      group: group,
      item: undefined,
      restaurantRef: this.accountService.getRestaurantRef(),
      editMode: false
    }).afterClosed().pipe(first());
  }

  openEditItem(group: MenuItemGroupGet, item: OrderElementDataWrapper) : Observable<OrderElementDataWrapper[] | undefined> {
    return this.dialogManager.openMenuItemComponent({
      group: group,
      item: item,
      restaurantRef: this.accountService.getRestaurantRef(),
      editMode: true
    }).afterClosed().pipe(first());
  }

  openSummary() : Observable<OrderSummaryOutputData> {
    return this.dialogManager.openSummary({
        restaurantRef: this.accountService.getRestaurantRef(),
        item: this.orderService.orderChanged.getValue()!,
        waiterMode: false,
        submitButtonText: $localize`Save`,
        orderComposerDialogManager: this.dialogManager
      })
      .afterClosed();
  }
  
}
