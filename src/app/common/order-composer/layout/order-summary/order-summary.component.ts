import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter, first, mergeMap, Observable } from 'rxjs';
import { FullWidthDialogService } from '@common/full-width-dialog/service/full-width-dialog.service';
import { OrderElementDataWrapper } from '@common/api-client/wrapper/order-element-data-wrapper';
import { OrderWrapper } from '@common/api-client/wrapper/order-wrapper';
import { MenuItemGroupControllerService } from '@common/api-client/services';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemGroupGet } from '@common/api-client/models';
import { OrderSummaryInputData } from './order-summary-input-data';
import { OrderSummaryOutputData } from './order-summary-output-data';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent {

  order: OrderWrapper;
  output: OrderSummaryOutputData;
  waiterMode: boolean;
  mode: 'SUMMARY' | 'ADD_ELEMENT' = 'SUMMARY';

  constructor(public dialogRef: MatDialogRef<OrderSummaryComponent>,
    private groupService: MenuItemGroupControllerService,
    private accountService: AccountService,
    private dialogService: FullWidthDialogService,
    @Inject(MAT_DIALOG_DATA) data: OrderSummaryInputData
  ) {
    this.order = JSON.parse(JSON.stringify(data.item));
    this.waiterMode = data.waiterMode

    this.output = {
      order: this.order,
      submit: false
    }
  }

  close() {
    this.output.submit = false;
    this.dialogRef.close(this.output);
  }

  editElement(item: OrderElementDataWrapper) {
    const initialIndex = this.order.activeElements.indexOf(item);

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
      if (next !== undefined) {
        const partI = this.order.activeElements.slice(0, initialIndex);
        const partII = this.order.activeElements.slice(initialIndex + 1, this.order.activeElements.length)
        this.order.activeElements = partI.concat(next).concat(partII);

        if (this.order.activeElements.length === 0) {
          this.close();
        }


        this.order.price = 0;
        for (const orderItem of this.order.activeElements) {
          this.order.price += orderItem.price;
        }
      }
    })
  }

  openAddNew() {
    
  }

  submit() {
    this.output.submit = true;
    this.dialogRef.close(this.output);
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
