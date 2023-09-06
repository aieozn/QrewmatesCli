import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { OrderDetailsGet, OrderGet, SubscribeOrdersMessage } from '@common/api-client/models';
import { OrderSocketService } from 'app/common/services/order-subscribe-socket/order-subscribe-socket.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
  providers: [ OrderSocketService ]
})
export class AdminOrdersComponent implements OnDestroy, OnInit {
  orders: OrderGet[] = [];
  private readonly onDestroy = new Subject<void>();

  constructor(
    private orderSocket: OrderSocketService,
    private accountService: AccountService
  ) {
    
  }
  
  showDetails(data: OrderDetailsGet) {

  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  ngOnInit(): void {
    // TODO może warto dodać stronnicowanie zamówień?
    this.orderSocket
      .subscribeOrder(this.accountService.getRestaurantRef())
      .pipe(
        tap(e => this.processMessage(e)),
        takeUntil(this.onDestroy)
      )
      .subscribe();
  }

  private processMessage(message: SubscribeOrdersMessage) {
    const newOrders = [];

    for (const messageOrder of message.orders) {
      let exists = false;

      for (const activeOrder of this.orders) {
        if (activeOrder.ref === messageOrder.ref) {
          exists = true;
          if (messageOrder.version > activeOrder.version) {
            newOrders.push(messageOrder);
            break;
          } else {
            newOrders.push(activeOrder);
            break;
          }
        }
      }

      if (!exists) {
        newOrders.push(messageOrder);
      }
    }
    
    const newOrdersRefs = newOrders.map(e => e.ref)

    for (const activeOrder of this.orders) {
      if (!newOrdersRefs.includes(activeOrder.ref)) {
        newOrders.push(activeOrder);
      }
    }
    this.updateOrders(newOrders);
  }

  private updateOrders(newOrders: OrderGet[]) {
    this.orders = newOrders;
    this.orders = this.orders.sort((a, b) => a.created.localeCompare(b.created))
  }
}
