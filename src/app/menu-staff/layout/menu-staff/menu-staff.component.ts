import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderGet } from 'src/app/openapi-cli/models/order-get';
import { SubscribeOrdersMessage } from 'src/app/openapi-cli/models/subscribe-orders-message';
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

  // TODO change services names OrderInstanceControllerService -> OrderInstanceService (and the same for others)
  constructor(
    private orderSocket: OrderSocketService,
    private accountService: AccountService
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
      this.orders = message.orders;
    } else if (message.batchType === 'CREATE') {
      let newOrders = [];
      newOrders = this.orders.concat(message.orders);
      this.orders = newOrders;
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


      this.orders = newOrders;
    }
  }
}
