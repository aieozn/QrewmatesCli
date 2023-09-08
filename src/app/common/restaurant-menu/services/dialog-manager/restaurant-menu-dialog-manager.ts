import { OrderElementDataWrapper } from '@common/api-client/wrapper/order-element-data-wrapper';
import { Observable, first } from 'rxjs';
import { MenuItemGroupGet } from '@common/api-client/models';
import { Inject, Injectable } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { OrderService } from '../order/order.service';
import { OrderSummaryOutputData } from '@common/order-composer/layout/order-summary/order-summary-output-data';
import { ORDER_COMPOSER_DIALOG_MANAGER_TOKEN } from '@common/order-composer/OrderComposerDialogManagerToken';
import { OrderComposerDialogManager } from '@common/order-composer/services/order-composer-dialog-manager.service';

@Injectable({
  providedIn: 'root'
})
export abstract class RestaurantMenuDialogManager {

  constructor(
    @Inject(ORDER_COMPOSER_DIALOG_MANAGER_TOKEN) private dialogManager: OrderComposerDialogManager,
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
        submitButtonText: $localize`Save`
      })
      .afterClosed();
  }
  
}
