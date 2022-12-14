import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { filter, first, map, mergeMap } from 'rxjs';
import { GenericDialogCliManager } from 'src/app/menu-cli/services/generic-dialog-cli-manager/generic-dialog-cli-manager';
import { OrderService } from 'src/app/menu-cli/services/order/order.service';
import { RestaurantService } from 'src/app/menu-cli/services/restaurant/restaurant.service';
import { MenuItemGroupControllerService } from 'src/app/openapi-cli/services';
import { OrderElementDataWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-element-data-wrapper';
import { OrderWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-wrapper';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  order: OrderWrapper;
  
  constructor(private orderService: OrderService, public dialogRef: MatDialogRef<OrderSummaryComponent>,
    private groupService: MenuItemGroupControllerService, private restaurantService: RestaurantService,
    private dialogManager: GenericDialogCliManager) {
    this.order = orderService.getOrder();
  }

  ngOnInit(): void {
  }

  public close() {
    this.dialogRef.close();
  }

  public editItem(item: OrderElementDataWrapper) {
    console.log("EDIT ITEM")
    console.log(item);
    let initialIndex = this.order.items.indexOf(item);

    this.groupService.getItemGroupDetails({
      restaurantRef: this.restaurantService.getRestaurantRef(),
      ref: item.menuItem.menuItemGroup
    }).pipe(
      first(),
      filter(x => x !== undefined),
      mergeMap(group => 
        this.dialogManager.openEditItem(group, item)
      )
    ).subscribe(next => {
      if (next) {
        let partI = this.order.items.slice(0, initialIndex);
        let partII = this.order.items.slice(initialIndex + 1, this.order.items.length)
        this.order.items = partI.concat(next).concat(partII);
        this.orderService.updateOrder(this.order);
      }
    })
  }

  public submit() {
    this.dialogRef.close(this.order);
  }

}
