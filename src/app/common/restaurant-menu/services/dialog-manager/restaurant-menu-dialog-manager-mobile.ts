import { OrderElementDataWrapper } from '@common/api-client/wrapper/order-element-data-wrapper';
import { first, Observable } from 'rxjs';
import { MenuItemGroupGet } from '@common/api-client/models';
import { FullWidthDialogService } from '@common/full-width-dialog/service/full-width-dialog.service';
import { AccountService } from '@common/account-utils/services/account.service';
import { RestaurantMenuDialogManager } from './restaurant-menu-dialog-manager';
import { Injectable } from '@angular/core';

@Injectable()
export class RestaurantMenuDialogManagerMobile extends RestaurantMenuDialogManager {

  constructor(
    private dialogService: FullWidthDialogService,
    private accountService: AccountService
  ) {
    super();
  }

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
}
