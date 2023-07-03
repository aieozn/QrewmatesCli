import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '@common/account-utils/services/account.service';
import { first, Observable } from 'rxjs';
import { MenuItemGroupGet, OrderDetailsGet } from '@common/api-client/models';
import { OrderElementDataWrapper } from '@common/api-client/wrapper/order-element-data-wrapper';
import { FullWidthDialogService } from '@common/full-width-dialog/service/full-width-dialog.service';
import { DoOrderActionDialogComponent } from '../../layout/do-order-action-dialog/do-order-action-dialog.component';
import { AcceptOrderActionDialogType } from './accept-order-aciton-dialog-type';
import { OrderSummaryInputData } from '@common/order-composer/layout/order-summary/order-summary-input-data';
import { OrderDetailsComponent } from 'app/modules/app-staff/app-edit-order/order-details/order-details.component';

@Injectable({
  providedIn: 'root'
})
export class StuffDiaglogService {

  constructor(
    private dialog: MatDialog,
    private dialogService: FullWidthDialogService,
    private accountService: AccountService
  ) { }

  openAcceptOrderActionDialog(type: AcceptOrderActionDialogType) {
    return this.dialog
      .open(DoOrderActionDialogComponent, {
        disableClose: true,
        width: "100%",
        data: {
          type: type
        }
      }).afterClosed();
  }
  
  openEditItem(group: MenuItemGroupGet, item: OrderElementDataWrapper) : Observable<OrderElementDataWrapper[] | undefined> {
    return this.dialogService.openMenuItemComponent({
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
    .open(OrderDetailsComponent, FullWidthDialogService.getDefaultGenericDialogConfig(
      {
        order: data
      }
    )).afterClosed();
  }
}