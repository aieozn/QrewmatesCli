import { Component, Input, OnInit } from '@angular/core';
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

  _order: OrderElementData | undefined;
  @Input() set order(value: OrderElementData | undefined) {
    this._order = value;
  }

  constructor() { }

  ngOnInit(): void {
  }

  select(topping: MenuItemToppingGet, selected: boolean) {
    if (this._order !== undefined) {
      if (selected) {
        this._order.toppings.push({
          ref: topping.ref!
        })
      } else {
        this._order.toppings = this._order.toppings.filter(e => e.ref !== topping.ref)
      }
      
      console.log("Order updated:")
      console.log(this._order)
    } else {
      console.error("Item not set");
    }
  }

}
