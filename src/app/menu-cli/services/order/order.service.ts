import { EventEmitter, Injectable } from '@angular/core';
import { first, firstValueFrom, Observable, tap } from 'rxjs';
import { OrderElementDataWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-element-data-wrapper';
import { OrderWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-wrapper';
import { DoOrderControllerService, OrderInstanceControllerService } from 'src/app/openapi-cli/services';
import { OrderDetailsGet } from 'src/app/openapi-cli/models/order-details-get';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public orderChanged = new EventEmitter<OrderWrapper>();
  private order: OrderWrapper;

  constructor(
    private orderService: DoOrderControllerService,
    private orderInstanceService: OrderInstanceControllerService,
    private accountService: AccountService
  ) {
    this.order = {
      price: 0,
      comment: undefined,
      paymentMethod: 'CASH',
      items: [],
      table: {
        ref: accountService.getTableRef()
      },
      editMode: false
    }
  }

  public addOrderElement(element: OrderElementDataWrapper) {
    this.order.items.push(JSON.parse(JSON.stringify(element)));
    this.order.price = 0;
    this.order.items.forEach(i => this.order.price += i.price);

    this.orderChanged.emit(this.order);
  }

  public addOrderElements(elements: OrderElementDataWrapper[]) {
    for (let element of elements) {
      this.addOrderElement(element);
    }
  }

  public getOrder() : OrderWrapper {
    return this.order;
  }

  public updateOrder(order: OrderWrapper) {
    this.order = order;
    this.order.price = 0;
    this.order.items.forEach(i => this.order.price += i.price);
    this.orderChanged.emit(this.order);
  }

  public submit(order: OrderWrapper) : Observable<OrderDetailsGet> {
    return this.orderService.order({
      restaurantRef: this.accountService.getRestaurantRef(),
      body: order
    }).pipe(
      first(),
      tap(_ => this.clearOrder())
    );
  }

  public clearOrder() {
    this.order = {
      price: 0,
      comment: undefined,
      items: [],
      paymentMethod: 'CASH',
      table: {
        ref: this.accountService.getTableRef()
      },
      editMode: false
    }

    this.orderChanged.emit(this.order);
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
