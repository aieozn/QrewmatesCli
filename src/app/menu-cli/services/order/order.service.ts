import { EventEmitter, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { OrderElementDataWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-element-data-wrapper';
import { OrderWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-wrapper';
import { DoOrderControllerService } from 'src/app/openapi-cli/services';
import { RestaurantService } from '../restaurant/restaurant.service';

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
      }
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

  public async submit() {
    let ordered = await firstValueFrom(this.orderService.order1({
      restaurant: this.restaurantService.getRestaurantRef(),
      body: this.order
    }));
    
    this.order = {
      price: 0,
      comment: undefined,
      items: [],
      paymentMethod: 'CASH',
      table: {
        ref: this.restaurantService.getTableRef()
      }
    }

    this.orderChanged.emit(this.order);
  }
}
