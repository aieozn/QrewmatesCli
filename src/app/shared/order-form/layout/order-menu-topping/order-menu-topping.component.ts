import { Component, Input } from '@angular/core';
import { OrderUtils } from 'src/app/shared/utils/order-utils';
import { OrderElementDataWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-element-data-wrapper';
import { MenuItemToppingCollectionGet, MenuItemToppingGet } from 'src/app/openapi-cli/models';

@Component({
  selector: 'app-order-menu-topping',
  templateUrl: './order-menu-topping.component.html',
  styleUrls: ['./order-menu-topping.component.scss']
})
export class OrderMenuToppingComponent {
  _order: OrderElementDataWrapper | undefined;
  _collection: MenuItemToppingCollectionGet | undefined;

  checked: MenuItemToppingGet[] = [];

  @Input() set collection(value: MenuItemToppingCollectionGet) {
    this._collection = value;
    this.init();
  }

  @Input('order') set order(value: OrderElementDataWrapper) {
    this._order = value;
    this.init();
  }

  constructor() { }

  init() {
    if (this._collection && this._order) {
      let collection = this._collection;
      let order = this._order;

      this.checked = collection.menuItemToppings
        .filter(collectionTopping => order.menuItemToppings.map(orderTopping => orderTopping.ref).includes(collectionTopping.ref));

      OrderUtils.updateOrderDetails(this._order);
    }
  }

  select(topping: MenuItemToppingGet, selected: boolean) {
    if (!this._order) { throw 'Order not defined'; }

    if (selected) {
      this._order.menuItemToppings.push(topping);
    } else {
      this._order.menuItemToppings = this._order.menuItemToppings.filter(e => e.ref !== topping.ref)
    }
    
    OrderUtils.updateOrderDetails(this._order);
  }
}
