import { Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable, tap } from 'rxjs';
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

  private createdOrderCookieName = 'qr-last-order-created';
  orderChanged: BehaviorSubject<OrderWrapper>;

  constructor(
    private orderInstanceService: OrderInstanceControllerService,
    private accountService: AccountService
  ) {
    const cookieValueString = localStorage.getItem(this.createdOrderCookieName);
    if (cookieValueString !== null) {
      const cookieValue: {
        order: OrderWrapper,
        created: string
      } = JSON.parse(cookieValueString);

      const expires = new Date();
      expires.setTime(new Date(cookieValue.created).getTime() + 6 * (1000 * 60 * 60))

      if (new Date() < expires) {
        console.log(cookieValue.order)
        this.orderChanged = new BehaviorSubject<OrderWrapper>(cookieValue.order);
      } else {
        this.orderChanged = new BehaviorSubject<OrderWrapper>(this.getCleanOrder());
        localStorage.removeItem(this.createdOrderCookieName);
      }
    } else {
      this.orderChanged = new BehaviorSubject<OrderWrapper>(this.getCleanOrder());
    }

    this.orderChanged.subscribe(newOrder => {
      this.saveOrderCookie(newOrder);
    })

  }

  private saveOrderCookie(order: OrderWrapper) {
    localStorage.setItem(this.createdOrderCookieName, JSON.stringify({
      order: order,
      created: new Date()
    }));
  }

  addOrderElement(element: OrderElementDataWrapper) {

    const order = this.orderChanged.getValue();
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
    }).pipe(
      first(),
      tap(_ => this.clearOrder())
    );
  }

  clearOrder() {
    this.orderChanged.next(this.getCleanOrder());
  }

  private getCleanOrder(): OrderWrapper {
    return {
      price: 0,
      comment: undefined,
      activeElements: [],
      elements: [],
      paymentMethod: 'CASH',
      table: {
        ref: this.accountService.getTableRef()
      },
      editMode: false,
    }
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
