import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderWrapper } from 'src/app/openapi-cli-wrapper/order/order-wrapper';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit, OnDestroy {

  orderUpdatedSubscription: Subscription;
  price: number = 0;
  itemsCount: number = 0;

  constructor(private orderService: OrderService) {
    this.orderUpdatedSubscription = orderService.orderChanged.subscribe(this.onOrderUpdate.bind(this))
  }
  
  ngOnDestroy(): void {
    this.orderUpdatedSubscription.unsubscribe();
  }

  public onOrderUpdate(order: OrderWrapper) {
    this.price = order.price
    this.itemsCount = order.items.length;
  }

  ngOnInit(): void {
  }

}
