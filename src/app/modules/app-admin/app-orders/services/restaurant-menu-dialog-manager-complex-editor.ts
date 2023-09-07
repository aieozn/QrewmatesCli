import { Injectable } from '@angular/core';
import { OrderElementDataWrapper } from '@common/api-client/wrapper/order-element-data-wrapper';
import { Observable, first, of } from 'rxjs';
import { MenuItemGroupGet } from '@common/api-client/models';
import { RestaurantMenuDialogManager } from 'app/common/restaurant-menu/services/dialog-manager/restaurant-menu-dialog-manager';
import { FullWidthDialogService } from '@common/full-width-dialog/service/full-width-dialog.service';
import { AccountService } from '@common/account-utils/services/account.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantMenuDialogManagerComplexEditor extends RestaurantMenuDialogManager {

  constructor(
    private dialogService: FullWidthDialogService,
    private accountService: AccountService
  ) { 
    super()
  }

  openAddItem(group: MenuItemGroupGet) : Observable<OrderElementDataWrapper[] | undefined> {
    return this.dialogService.openMenuItemComponentDesktop({
      group: group,
      item: undefined,
      restaurantRef: this.accountService.getRestaurantRef(),
      editMode: false
    }).afterClosed().pipe(first());
  }

  openEditItem(group: MenuItemGroupGet, item: OrderElementDataWrapper) : Observable<OrderElementDataWrapper[] | undefined> {
    console.log("Edit item:")
    console.log(group);

    return of(undefined);
  }
}
