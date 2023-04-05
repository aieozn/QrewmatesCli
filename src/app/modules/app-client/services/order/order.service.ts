import { Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable, tap } from 'rxjs';
import { OrderElementDataWrapper } from '@common/api-client/wrapper/order-element-data-wrapper';
import { OrderDetailsGet } from '@common/api-client/models/order-details-get';
import { OrderWrapper } from '@common/api-client/wrapper/order-wrapper';
import { OrderInstanceControllerService } from '@common/api-client/services';
import { AccountService } from '@common/account-utils/services/account.service';
import { OrderData, OrderElementData } from '@common/api-client/models';

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
    localStorage.setItem(this.createdOrderCookieName, JSON.stringify({
      order: order,
      created: new Date()
    }));
  }

  addOrderElement(element: OrderElementDataWrapper) {

    const order = this.orderChanged.getValue();
    order.items.push(JSON.parse(JSON.stringify(element)));
    order.price = 0;

    for (const orderItem of order.items) {
      order.price += orderItem.price;
    }
  
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
    activeOrder.price = 0;

    for (const orderItem of newOrder.items) {
      activeOrder.price += orderItem.price;
    }

    this.orderChanged.next(activeOrder);
  }

  submit(order: OrderWrapper) : Observable<OrderDetailsGet> {
    return this.orderInstanceService.order({
      restaurantRef: this.accountService.getRestaurantRef(),
      body: this.trimOrder(order)
    }).pipe(
      first(),
      tap(_ => this.clearOrder())
    );
  }

  // Remove all not required parameterd from order
  trimOrder(order: OrderWrapper) : OrderData {
    return {
      comment: order.comment,
      items: order.items.map(e => this.trimOrderElement(e)),
      paymentMethod: order.paymentMethod,
      table: {
        ref: order.table.ref
      }
    }
  }

  trimOrderElement(orderElement: OrderElementDataWrapper) : OrderElementData {
      return {
        comment: orderElement.comment,
        menuItem: {
          ref: orderElement.menuItem.ref
        },
        menuItemSelects: orderElement.menuItemSelects.map(elememnt => {
          return {
            ref: elememnt.ref
          }
        }),
        menuItemToppings: orderElement.menuItemToppings.map(element => {
          return {
            ref: element.ref
          }
        })
      }
  }


  clearOrder() {
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
