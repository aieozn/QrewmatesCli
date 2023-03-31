import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter, first, mergeMap, Observable } from 'rxjs';
import { FullWidthDialogService } from '@common/full-width-dialog/service/full-width-dialog.service';
import { OrderElementDataWrapper } from '@common/api-client/wrapper/order-element-data-wrapper';
import { ExportSummaryData } from './order-summary-data';
import { OrderWrapper } from '@common/api-client/wrapper/order-wrapper';
import { MenuItemGroupControllerService } from '@common/api-client/services';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemGroupGet } from '@common/api-client/models';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent {

  order: OrderWrapper;
  
  constructor(public dialogRef: MatDialogRef<OrderSummaryComponent>,
    private groupService: MenuItemGroupControllerService,
    private accountService: AccountService,
    private dialogService: FullWidthDialogService,
    @Inject(MAT_DIALOG_DATA) data: ExportSummaryData) {
      this.order = JSON.parse(JSON.stringify(data.item));
  }

  close() {
    this.dialogRef.close();
  }

  editItem(item: OrderElementDataWrapper) {
    const initialIndex = this.order.items.indexOf(item);

    this.groupService.getItemGroupDetails({
      restaurantRef: this.accountService.getRestaurantRef(),
      menuItemGroupRef: item.menuItem.menuItemGroupRef
    }).pipe(
      first(),
      filter(x => x !== undefined),
      mergeMap(group => 
        this.openEditItem(group, item)
      )
    ).subscribe(next => {
      if (next) {
        const partI = this.order.items.slice(0, initialIndex);
        const partII = this.order.items.slice(initialIndex + 1, this.order.items.length)
        this.order.items = partI.concat(next).concat(partII);
      }
    })
  }

  submit() {
    this.dialogRef.close(this.order);
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
