import { Component, Input } from '@angular/core';
import { OrderUtils } from '@common/order-composer/utils/order-utils';
import { OrderElementDataWrapper } from '@common/api-client/wrapper/order-element-data-wrapper';
import { MenuItemToppingCollectionGet, MenuItemToppingGet } from '@common/api-client/models';

@Component({
  selector: 'app-order-menu-topping',
  templateUrl: './order-menu-topping.component.html',
  styleUrls: ['./order-menu-topping.component.scss']
})
export class OrderMenuToppingComponent {
  _order: OrderElementDataWrapper | undefined;
  _collection: MenuItemToppingCollectionGet | undefined;

  checked: string[] = [];

  @Input() set collection(value: MenuItemToppingCollectionGet) {
    this._collection = value;
    this.init();
  }

  @Input('order') set order(value: OrderElementDataWrapper) {
    this._order = value;
    this.init();
  }

  init() {
    if (this._collection && this._order) {
      const collection = this._collection;
      const order = this._order;

      this.checked = collection.menuItemToppings
        .filter(collectionTopping => order.menuItemToppings.map(orderTopping => orderTopping.ref).includes(collectionTopping.ref))
        .map(e => e.ref);

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
