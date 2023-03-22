import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first, Observable } from 'rxjs';
import { MenuItemGroupGet } from 'src/app/openapi-cli/models';
import { GenericDialogService } from 'src/app/shared/generic-dialog/service/generic-dialog.service';
import { OrderElementDataWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-element-data-wrapper';
import { AccountService } from 'src/app/shared/account/services/account.service';
import { DoOrderActionDialogComponent } from '../../layout/do-order-action-dialog/do-order-action-dialog.component';
import { AcceptOrderActionDialogType } from './accept-order-aciton-dialog-type';

@Injectable({
  providedIn: 'root'
})
export class GenericDialogStuffManagerService {

  constructor(
    private dialog: MatDialog,
    private dialogService: GenericDialogService,
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
