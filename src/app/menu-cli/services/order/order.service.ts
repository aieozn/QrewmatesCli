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
  private order: OrderWrapper | undefined;

  constructor(
    private orderService: DoOrderControllerService,
    private orderInstanceService: OrderInstanceControllerService,
    private accountService: AccountService
  ) {
    let tableRef = accountService.getTableRef();

    if (tableRef) {
      this.order = {
        price: 0,
        comment: undefined,
        paymentMethod: 'CASH',
        items: [],
        table: {
          ref: tableRef
        },
        editMode: false
      }
    }
  }

  public addOrderElement(element: OrderElementDataWrapper) {
    if (this.order !== undefined) {
      this.order.items.push(JSON.parse(JSON.stringify(element)));
      this.order.price = 0;

      for (let orderItem of this.order.items) {
        this.order.price += orderItem.price;
      }
  
      this.orderChanged.emit(this.order);
    } else {
      throw 'No order found';
    }
    
  }

  public addOrderElements(elements: OrderElementDataWrapper[]) {
    for (let element of elements) {
      this.addOrderElement(element);
    }
  }

  // Undefined when 
  public getOrder() : OrderWrapper | undefined {
    return this.order;
  }

  public updateOrder(order: OrderWrapper) {
    this.order = order;
    this.order.price = 0;

    for (let orderItem of this.order.items) {
      this.order.price += orderItem.price;
    }

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
    if (this.order !== undefined) {
      this.order = {
        price: 0,
        comment: undefined,
        items: [],
        paymentMethod: 'CASH',
        table: {
          ref: this.order.table.ref
        },
        editMode: false
      }
  
      this.orderChanged.emit(this.order);
    } else {
      throw 'Order not defined'
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
