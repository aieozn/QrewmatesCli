import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderElementDataWrapper } from '@common/api-client/wrapper/order-element-data-wrapper';
import { OrderDetailsGet } from '@common/api-client/models/order-details-get';
import { OrderWrapper } from '@common/api-client/wrapper/order-wrapper';
import { OrderInstanceControllerService } from '@common/api-client/services';
import { AccountService } from '@common/account-utils/services/account.service';
import { OrderWrapperTrimmer } from '@common/api-client/wrapper/order-wrapper-trimmer';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderChanged = new BehaviorSubject<OrderWrapper | undefined>(undefined);

  constructor(
    private orderInstanceService: OrderInstanceControllerService,
    private accountService: AccountService
  ) {
  }

  addOrderElement(element: OrderElementDataWrapper) {
    const order = this.orderChanged.getValue();

    if (!order) { throw 'Order not dedined' }
    order.activeElements.push(JSON.parse(JSON.stringify(element)));
    order.price = this.conuntPrice(order);

    this.orderChanged.next(order);
  }

  addOrderElements(elements: OrderElementDataWrapper[]) {
    for (const element of elements) {
      this.addOrderElement(element);
    }
  }

  updateOrder(newOrder: OrderWrapper) {
    let activeOrder = this.orderChanged.getValue();

    activeOrder = newOrder;
    activeOrder.price = this.conuntPrice(activeOrder);
  
    this.orderChanged.next(activeOrder);
  }

  conuntPrice(newOrder: OrderWrapper) {
    let price = 0;

    for (const orderItem of newOrder.activeElements) {
      price += orderItem.price;
    }

    for (const orderItem of newOrder.elements) {
      price += orderItem.price;
    }

    return price;
  }

  submit(order: OrderWrapper) : Observable<OrderDetailsGet> {
    return this.orderInstanceService.order({
      restaurantRef: this.accountService.getRestaurantRef(),
      body: OrderWrapperTrimmer.trimOrder(order)
    });
  }

  loadOrder(info: {
    ref: string,
    restaurantRef: string
  }) : Observable<OrderDetailsGet> {
    return this.orderInstanceService.getOrder({
      restaurantRef: info.restaurantRef,
      orderInstanceRef: info.ref
    })
  }
}
