import { EventEmitter, Injectable } from '@angular/core';
import { first, firstValueFrom, Observable, tap } from 'rxjs';
import { OrderElementDataWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-element-data-wrapper';
import { OrderWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-wrapper';
import { DoOrderControllerService } from 'src/app/openapi-cli/services';
import { RestaurantService } from '../../../shared/menu-horizontal/service/restaurant/restaurant.service';
import { OrderDetailsGet } from 'src/app/openapi-cli/models/order-details-get';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public orderChanged = new EventEmitter<OrderWrapper>();
  private order: OrderWrapper;

  constructor(private orderService: DoOrderControllerService, private restaurantService: RestaurantService) {
    this.order = {
      price: 0,
      comment: undefined,
      paymentMethod: 'CASH',
      items: [],
      table: {
        ref: restaurantService.getTableRef()
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
      restaurantRef: this.restaurantService.getRestaurantRef(),
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
        ref: this.restaurantService.getTableRef()
      },
      editMode: false
    }

    this.orderChanged.emit(this.order);
  }
}
