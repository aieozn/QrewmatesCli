import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderGet } from 'src/app/openapi-cli/models/order-get';
import { SubscribeOrdersMessage } from 'src/app/openapi-cli/models/subscribe-orders-message';
import { OrderStatusControllerService } from 'src/app/openapi-cli/services';
import { UpdateOrderStatusMessage } from '../model/update-order-status-message';
import { AccountService } from '../../shared/services/account/account.service';
import { OrderSocketService } from '../services/order-subscribe-socket/order-subscribe-socket.service';

@Component({
  selector: 'app-menu-staff',
  templateUrl: './menu-staff.component.html',
  styleUrls: ['./menu-staff.component.scss'],
  providers: [ OrderSocketService ]
})
export class MenuStaffComponent implements OnInit, OnDestroy {

  public orders: OrderGet[] = [];
  public tableCounter: { [tableName: string]: {
    "name": string,
    "count": number
  }; } = {};

  // TODO change services names OrderInstanceControllerService -> OrderInstanceService (and the same for others)
  constructor(
    private orderSocket: OrderSocketService,
    private accountService: AccountService,
    private orderStatusService: OrderStatusControllerService
  ) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    // TODO może warto dodać stronnicowanie zamówień?
    this.orderSocket.subscribeOrder(this.accountService.getRestaurantRef()).subscribe(e => {
      this.processMessage(e)
    });
  }

  private processMessage(message: SubscribeOrdersMessage) {
    let newOrders = [];

    for (let messageOrder of message.orders) {
      let exists = false;

      for (let activeOrder of this.orders) {
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
    
    let newOrdersRefs = newOrders.map(e => e.ref)

    for (let activeOrder of this.orders) {
      if (!newOrdersRefs.includes(activeOrder.ref)) {
        newOrders.push(activeOrder);
      }
    }

    this.updateOrders(newOrders);
  }

  public updateStatus(order: OrderGet, message: UpdateOrderStatusMessage) : boolean {
    this.orderStatusService.updateStatus({
      restaurantRef: order.restaurantRef,
      orderInstanceRef: order.ref,
      body: message
    }).subscribe(response => {
      this.replaceOrder(order.ref, response);
      this.updateOrders(this.orders);
    });

    return false;
  }

  private replaceOrder(ref: string, newData: OrderGet) {
    for (var i = 0; i < this.orders.length; i++) {
      if (this.orders[i].ref === ref) {
        if (this.orders[i].version < newData.version) {
          this.orders[i] = newData;
        }

        return;
      }
    }

    throw 'Order not found';
  }

  private updateOrders(newOrders: OrderGet[]) {
    this.orders = newOrders;
    this.orders = this.orders.sort((a, b) => a.created.localeCompare(b.created))

    this.tableCounter = {};
    let waitingOrders = this.orders.filter(e => e.orderStatus === 'PLACED')

    for (var order of waitingOrders) {
      if (order.table.ref in this.tableCounter) {
        this.tableCounter[order.table.ref].count += 1;
      } else {
        this.tableCounter[order.table.ref] = {
          name: order.table.name,
          count: 1
        }
      }
    }
  }
}
