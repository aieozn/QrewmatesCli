import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter, first, mergeMap, Observable } from 'rxjs';
import { FullWidthDialogService } from 'src/app/common/full-width-dialog/service/full-width-dialog.service';
import { MenuItemGroupGet } from 'src/app/openapi-cli/models';
import { MenuItemGroupControllerService } from 'src/app/openapi-cli/services';
import { OrderElementDataWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-element-data-wrapper';
import { OrderWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-wrapper';
import { AccountService } from 'src/app/shared/account/services/account.service';
import { ExportSummaryData } from './order-summary-data';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  order: OrderWrapper;
  
  constructor(public dialogRef: MatDialogRef<OrderSummaryComponent>,
    private groupService: MenuItemGroupControllerService,
    private accountService: AccountService,
    private dialogService: FullWidthDialogService,
    @Inject(MAT_DIALOG_DATA) data: ExportSummaryData) {
      this.order = JSON.parse(JSON.stringify(data.item));
  }

  ngOnInit(): void {
  }

  public close() {
    this.dialogRef.close();
  }

  public editItem(item: OrderElementDataWrapper) {
    let initialIndex = this.order.items.indexOf(item);

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
        let partI = this.order.items.slice(0, initialIndex);
        let partII = this.order.items.slice(initialIndex + 1, this.order.items.length)
        this.order.items = partI.concat(next).concat(partII);
      }
    })
  }

  public submit() {
    this.dialogRef.close(this.order);
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
