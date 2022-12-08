import { Component, Input } from '@angular/core';
import { OrderUtils } from 'src/app/menu-cli/utils/order-utils';
import { OrderElementDataWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-element-data-wrapper';
import { MenuItemToppingCollectionGet, MenuItemToppingGet } from 'src/app/openapi-cli/models';

@Component({
  selector: 'app-order-menu-topping',
  templateUrl: './order-menu-topping.component.html',
  styleUrls: ['./order-menu-topping.component.scss']
})
export class OrderMenuToppingComponent {

  _collection: MenuItemToppingCollectionGet | undefined;
  @Input() set collection(value: MenuItemToppingCollectionGet) {
    this._collection = value;
  }

  @Input('order') order: OrderElementDataWrapper | undefined;

  constructor() { }

  select(topping: MenuItemToppingGet, selected: boolean) {
    if (!this.order) { throw 'Order not defined'; }

    if (selected) {
      this.order.toppings.push(topping);
    } else {
      this.order.toppings = this.order.toppings.filter(e => e.ref !== topping.ref)
    }
    
    console.log("Order updated:")
    console.log(this.order)

    OrderUtils.updateOrderDetails(this.order);
  }
}
