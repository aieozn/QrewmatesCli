import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { OrderGet } from '@common/api-client/models/order-get';
import { SubscribeOrdersMessage } from '@common/api-client/models/subscribe-orders-message';
import { ActiveUser } from '@common/account-utils/model/active-user.interface';
import { Subject, takeUntil, tap } from 'rxjs';
import { OrderDetailsGet } from '@common/api-client/models';
import { StuffDiaglogService } from '../services/generic-dialog-stuff-manager/staff-dialog.service';
import { OrderSocketService } from 'app/common/services/order-subscribe-socket/order-subscribe-socket.service';
import { OrderInstanceControllerService } from '@common/api-client/services';

@Component({
  selector: 'app-menu-staff',
  templateUrl: './app-staff.component.html',
  styleUrls: ['./app-staff.component.scss'],
  providers: [ OrderSocketService ]
})
export class AppStaffComponent implements OnDestroy {

  orders: OrderGet[] = [];
  me: ActiveUser;
  tableCounter: { [tableName: string]: {
    "name": string,
    "count": number
  }; } = {};
  private readonly onDestroy = new Subject<void>();

  // TODO change services names OrderInstanceControllerService -> OrderInstanceService (and the same for others)
  constructor(
    private orderSocket: OrderSocketService,
    private accountService: AccountService,
    private dialogManager: StuffDiaglogService,
    private orderInstanceService: OrderInstanceControllerService
  ) {
    this.me = accountService.getActiveUserOrLogin()
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

    this.tableCounter = {};
    const waitingOrders = this.orders.filter(e => e.orderStatus === 'PLACED')

    for (const order of waitingOrders) {
      if (order.table) {
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

  showDetails(ref: string) {
    this.orderInstanceService.getOrder({
      restaurantRef: this.accountService.getRestaurantRef(),
      orderInstanceRef: ref
    })
    .pipe(
      tap(orderDetails => this.dialogManager.openDetails(orderDetails).subscribe())
    )
    .subscribe();
  }
}
