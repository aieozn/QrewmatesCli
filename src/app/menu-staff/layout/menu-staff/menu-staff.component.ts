import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderGet } from 'src/app/openapi-cli/models/order-get';
import { SubscribeOrdersMessage } from 'src/app/openapi-cli/models/subscribe-orders-message';
import { OrderStatusControllerService } from 'src/app/openapi-cli/services';
import { AccountService } from '../../services/account/account.service';
import { OrderSocketService } from '../../services/order-socket/order-socket.service';

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
    if (message.batchType === 'LOAD') {
      this.updateOrders(message.orders);
    } else if (message.batchType === 'CREATE') {
      let newOrders = [];
      newOrders = this.orders.concat(message.orders);
      this.updateOrders(newOrders);
    } else if (message.batchType === 'UPDATE') {
      let newOrders: OrderGet[] = [];

      for (let messageOrder of message.orders) {
        let updated = false;

        for (let activeOrder of this.orders) {
          if (activeOrder.ref !== messageOrder.ref) {
            newOrders.push(activeOrder);
          } else {
            newOrders.push(messageOrder);
            updated = true;
          }
        }

        if (!updated) {
          newOrders.push(messageOrder);
        }
      }


      this.updateOrders(newOrders);
    }
  }

  public updateStatus(order: OrderGet, action: ('ACCEPT' | 'PAY' | 'SERVE' | 'REJECT' | 'CANCEL')) : boolean {
    this.orderStatusService.updateStatus({
      "restaurantRef": order.restaurantRef,
      "ref": order.ref,
      "body": {
        "orderAction": action
      }
    }).subscribe(response => {
      // TODO może tutaj dojść do wyścigu, dlatego API powinno zwrócić numer wersji elementu. Należy dokonać podmiany
      // tylko jeżeli pobrana wersja jest nowsza niż aktualna
      this.replaceOrder(order.ref, response);
      this.updateOrders(this.orders);
    });

    return false;
  }

  private replaceOrder(ref: string, newData: OrderGet) {
    for (var i = 0; i < this.orders.length; i++) {
      if (this.orders[i].ref === ref) {
        this.orders[i] = newData;
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
