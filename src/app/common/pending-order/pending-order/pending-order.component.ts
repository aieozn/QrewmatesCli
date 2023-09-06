import { Component, EventEmitter, Input, Output } from '@angular/core';
import { tap } from 'rxjs';
import { OrderInstanceControllerService } from '@common/api-client/services';
import { AccountService } from '@common/account-utils/services/account.service';
import { OrderDetailsGet, OrderGet } from '@common/api-client/models';
import { UserAction } from 'app/common/translators';
import { ManageOrderStatusService } from 'app/common/services/manage-order-status/manage-order-status.service';

@Component({
  selector: 'app-pending-order',
  templateUrl: './pending-order.component.html',
  styleUrls: ['./pending-order.component.scss']
})
export class PendingOrderComponent {

  _order: OrderGet | undefined;

  @Input('order') set order(value: OrderGet) {
    this._order = value;
  }

  // @Output('changeStatus') changeStatus = new EventEmitter<UpdateOrderStatusMessage>();
  @Output('onDetails') onDetails = new EventEmitter<OrderDetailsGet>();

  constructor(
    private orderInstanceService: OrderInstanceControllerService,
    private accountService: AccountService,
    private manageOrderStatusService: ManageOrderStatusService
  ) {
  }
  
  edit() {
    if (!this._order) { throw 'Order not defined'; }

    this.orderInstanceService.getOrder({
      restaurantRef: this.accountService.getRestaurantRef(),
      orderInstanceRef: this._order.ref
    })
    .pipe(
      tap(orderDetails => this.onDetails.emit(orderDetails))
    )
    .subscribe();
  }

  doAction(event: Event, action: UserAction) : boolean {
    if (this._order) {
      this.manageOrderStatusService.handleAction(this._order.restaurantRef, this._order.ref, action);
    }
    
    
    event.stopPropagation();
    return false;
  }
}
