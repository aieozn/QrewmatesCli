import { Component, Input, OnInit } from '@angular/core';
import { OrderUtils } from 'src/app/menu-cli/utils/order-utils';
import { OrderElementDataWrapper } from 'src/app/openapi-cli-wrapper/order/order-element-data-wrapper';
import { MenuItemToppingCollectionGet, MenuItemToppingGet, OrderElementData } from 'src/app/openapi-cli/models';

@Component({
  selector: 'app-order-menu-topping',
  templateUrl: './order-menu-topping.component.html',
  styleUrls: ['./order-menu-topping.component.scss']
})
export class OrderMenuToppingComponent implements OnInit {

  _collection: MenuItemToppingCollectionGet | undefined;
  @Input() set collection(value: MenuItemToppingCollectionGet) {
    this._collection = value;
  }

  @Input('order') order!: OrderElementDataWrapper;

  constructor() { }

  ngOnInit(): void {
  }

  select(topping: MenuItemToppingGet, selected: boolean) {
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
