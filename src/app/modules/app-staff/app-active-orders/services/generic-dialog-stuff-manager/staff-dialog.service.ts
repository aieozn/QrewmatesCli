import { Inject, Injectable } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { first, Observable } from 'rxjs';
import { MenuItemGroupGet, OrderDetailsGet } from '@common/api-client/models';
import { OrderElementDataWrapper } from '@common/api-client/wrapper/order-element-data-wrapper';
import { OrderDetailsDialogComponent } from 'app/modules/app-staff/app-edit-order/order-details-dialog/order-details-dialog.component';
import { ORDER_COMPOSER_DIALOG_MANAGER_TOKEN } from '@common/order-composer/OrderComposerDialogManagerToken';
import { OrderComposerDialogManager } from '@common/order-composer/services/order-composer-dialog-manager.service';
import { OrderComposerDialogManagerMobile } from 'app/common/services/dialog-manager/mobile/order-composer-dialog-manager-mobile.service';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class StuffDiaglogService {

  constructor(
    @Inject(ORDER_COMPOSER_DIALOG_MANAGER_TOKEN) private dialogManager: OrderComposerDialogManager,
    private accountService: AccountService,
    private dialogService: MatDialog
  ) { }
  
  openEditItem(group: MenuItemGroupGet, item: OrderElementDataWrapper) : Observable<OrderElementDataWrapper[] | undefined> {
    return this.dialogManager.openMenuItemComponent({
      group: group,
      item: item,
      restaurantRef: this.accountService.getRestaurantRef(),
      editMode: true
    }).afterClosed().pipe(first());
  }

  openDetails(data: OrderDetailsGet) {
    return this.dialogService.open(OrderDetailsDialogComponent, OrderComposerDialogManagerMobile.getDefaultGenericDialogConfig(
      {
        order: data
      })).afterClosed();
  }
}
