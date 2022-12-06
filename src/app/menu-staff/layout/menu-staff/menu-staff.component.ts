import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
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
    console.log("Destroy")
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
    }

    console.log(this.orders);
  }

}
