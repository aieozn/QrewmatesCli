import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '@common/account-utils/services/account.service';
import { first, Observable } from 'rxjs';
import { MenuItemGroupGet, OrderDetailsGet } from '@common/api-client/models';
import { OrderElementDataWrapper } from '@common/api-client/wrapper/order-element-data-wrapper';
import { FullWidthDialogService } from '@common/full-width-dialog/service/full-width-dialog.service';
import { OrderSummaryInputData } from '@common/order-composer/layout/order-summary/order-summary-input-data';
import { OrderDetailsDialogComponent } from 'app/modules/app-staff/app-edit-order/order-details-dialog/order-details-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class StuffDiaglogService {

  constructor(
    private dialog: MatDialog,
    private dialogService: FullWidthDialogService,
    private accountService: AccountService
  ) { }
  
  openEditItem(group: MenuItemGroupGet, item: OrderElementDataWrapper) : Observable<OrderElementDataWrapper[] | undefined> {
    return this.dialogService.openMenuItemComponentMobile({
      group: group,
      item: item,
      restaurantRef: this.accountService.getRestaurantRef(),
      editMode: true
    }).afterClosed().pipe(first());
  }

  openSummary(data: OrderSummaryInputData) {
    return this.dialogService.openSummary(data);
  }

  openDetails(data: OrderDetailsGet) {
    return this.dialog
    .open(OrderDetailsDialogComponent, FullWidthDialogService.getDefaultMobileGenericDialogConfig(
      {
        order: data
      })).afterClosed();
  }
}
