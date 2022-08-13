import { EventEmitter, Injectable } from '@angular/core';
import { OrderElementDataWrapper } from 'src/app/openapi-cli-wrapper/order/order-element-data-wrapper';
import { OrderWrapper } from 'src/app/openapi-cli-wrapper/order/order-wrapper';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public orderChanged = new EventEmitter<OrderWrapper>();
  private order: OrderWrapper;

  constructor() {
    this.order = {
      "price": 0,
      "comment": undefined,
      "items": []
    }
  }

  public addOrderElement(element: OrderElementDataWrapper) {
    this.order.items.push(JSON.parse(JSON.stringify(element)));
    this.order.price = 0;
    this.order.items.forEach(i => this.order.price += i.price);

    this.orderChanged.emit(this.order);
  }

  public getOrder() : OrderWrapper {
    return this.order;
  }

  public submit() {
    console.log("Submit order");

    this.order = {
      "price": 0,
      "comment": undefined,
      "items": []
    }

    this.orderChanged.emit(this.order);
  }
}
