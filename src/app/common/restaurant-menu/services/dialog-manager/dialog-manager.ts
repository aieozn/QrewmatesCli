import { Injectable } from '@angular/core';
import { OrderElementDataWrapper } from '@common/api-client/wrapper/order-element-data-wrapper';
import { first, Observable } from 'rxjs';
import { MenuItemGroupGet } from '@common/api-client/models';
import { FullWidthDialogService } from '@common/full-width-dialog/service/full-width-dialog.service';
import { AccountService } from '@common/account-utils/services/account.service';

@Injectable({
  providedIn: 'root'
})
export class DialogManager {

  constructor(
    private dialogService: FullWidthDialogService,
    private accountService: AccountService
  ) { }

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
}
