import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first, Observable } from 'rxjs';
import { AccountService } from 'src/app/common/account-utils/services/account.service';
import { MenuItemGroupGet } from 'src/app/common/api-client/models';
import { OrderElementDataWrapper } from 'src/app/common/api-client/wrapper/order-element-data-wrapper';
import { FullWidthDialogService } from 'src/app/common/full-width-dialog/service/full-width-dialog.service';
import { DoOrderActionDialogComponent } from '../../layout/do-order-action-dialog/do-order-action-dialog.component';
import { AcceptOrderActionDialogType } from './accept-order-aciton-dialog-type';

@Injectable({
  providedIn: 'root'
})
export class GenericDialogStuffManagerService {

  constructor(
    private dialog: MatDialog,
    private dialogService: FullWidthDialogService,
    private accountService: AccountService
  ) { }

  public openAcceptOrderActionDialog(type: AcceptOrderActionDialogType) {
    return this.dialog
      .open(DoOrderActionDialogComponent, {
        disableClose: true,
        width: "100%",
        data: {
          type: type
        }
      }).afterClosed();
  }
  
  public openEditItem(group: MenuItemGroupGet, item: OrderElementDataWrapper) : Observable<OrderElementDataWrapper[] | undefined> {
    return this.dialogService.openMenuItemComponent({
      group: group,
      item: item,
      restaurantRef: this.accountService.getRestaurantRef(),
      editMode: true
    }).afterClosed().pipe(first());
  }
}
