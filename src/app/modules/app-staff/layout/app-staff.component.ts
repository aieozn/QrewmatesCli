import { Component } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { OrderGet } from '@common/api-client/models/order-get';
import { SubscribeOrdersMessage } from '@common/api-client/models/subscribe-orders-message';
import { OrderStatusControllerService } from '@common/api-client/services';
import { UpdateOrderStatusMessage } from '../model/update-order-status-message';
import { OrderSocketService } from '../services/order-subscribe-socket/order-subscribe-socket.service';

@Component({
  selector: 'app-menu-staff',
  templateUrl: './app-staff.component.html',
  styleUrls: ['./app-staff.component.scss'],
  providers: [ OrderSocketService ]
})
export class AppStaffComponent {

  orders: OrderGet[] = [];
  tableCounter: { [tableName: string]: {
    "name": string,
    "count": number
  }; } = {};

  // TODO change services names OrderInstanceControllerService -> OrderInstanceService (and the same for others)
  constructor(
    private orderSocket: OrderSocketService,
    private accountService: AccountService,
    private orderStatusService: OrderStatusControllerService
  ) { }

  ngOnInit(): void {
    // TODO może warto dodać stronnicowanie zamówień?
    this.orderSocket.subscribeOrder(this.accountService.getRestaurantRef()).subscribe(e => {
      this.processMessage(e)
    });
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

  updateStatus(order: OrderGet, message: UpdateOrderStatusMessage) : boolean {
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
    for (let i = 0; i < this.orders.length; i++) {
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
    const waitingOrders = this.orders.filter(e => e.orderStatus === 'PLACED')

    for (const order of waitingOrders) {
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
