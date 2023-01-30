import { Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable, tap } from 'rxjs';
import { OrderElementDataWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-element-data-wrapper';
import { OrderWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-wrapper';
import { DoOrderControllerService, OrderInstanceControllerService } from 'src/app/openapi-cli/services';
import { OrderDetailsGet } from 'src/app/openapi-cli/models/order-details-get';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private createdOrderCookieName = 'qr-last-order-created';
  public orderChanged: BehaviorSubject<OrderWrapper>;

  constructor(
    private orderService: DoOrderControllerService,
    private orderInstanceService: OrderInstanceControllerService,
    private accountService: AccountService
  ) {
    let tableRef = accountService.getTableRef();


    let cookieValueString = localStorage.getItem(this.createdOrderCookieName);
    if (cookieValueString !== null) {
      let cookieValue: {
        order: OrderWrapper,
        created: string
      } = JSON.parse(cookieValueString);

      console.log("Load order")

      let expires = new Date();
      expires.setHours(new Date(cookieValue.created).getHours() + 6)

      if (new Date() < expires) {
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
    console.log("Order changed");
    console.log(order.price);

    localStorage.setItem(this.createdOrderCookieName, JSON.stringify({
      order: order,
      created: new Date()
    }));
  }

  public addOrderElement(element: OrderElementDataWrapper) {

    let order = this.orderChanged.getValue();
    order.items.push(JSON.parse(JSON.stringify(element)));
    order.price = 0;

    for (let orderItem of order.items) {
      order.price += orderItem.price;
    }
  
    this.orderChanged.next(order);
  }

  public addOrderElements(elements: OrderElementDataWrapper[]) {
    for (let element of elements) {
      this.addOrderElement(element);
    }
  }

  public updateOrder(newOrder: OrderWrapper) {
    let activeOrder = this.orderChanged.getValue();

    activeOrder = newOrder;
    activeOrder.price = 0;

    for (let orderItem of newOrder.items) {
      activeOrder.price += orderItem.price;
    }

    this.orderChanged.next(activeOrder);
  }

  public submit(order: OrderWrapper) : Observable<OrderDetailsGet> {
    console.log("Submit")
    return this.orderService.order({
      restaurantRef: this.accountService.getRestaurantRef(),
      body: order
    }).pipe(
      first(),
      tap(_ => this.clearOrder())
    );
  }

  public clearOrder() {
    this.orderChanged.next(this.getCleanOrder());
  }

  private getCleanOrder(): OrderWrapper {
    return {
      price: 0,
      comment: undefined,
      items: [],
      paymentMethod: 'CASH',
      table: {
        ref: this.accountService.getTableRef()
      },
      editMode: false,
    }
  }

  public loadOrder(info: {
    ref: any,
    restaurantRef: any
  }) : Observable<OrderDetailsGet> {
    return this.orderInstanceService.getOrder({
      restaurantRef: info.restaurantRef,
      ref: info.ref
    })
  }
}
