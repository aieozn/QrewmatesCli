import { Component, Input } from '@angular/core';
import { OrderGet } from '@common/api-client/models';
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

  constructor(
    private manageOrderStatusService: ManageOrderStatusService
  ) {
  }

  doAction(event: Event, action: UserAction) : boolean {
    if (this._order) {
      this.manageOrderStatusService.handleAction(this._order.restaurantRef, this._order.ref, action);
    }
    
    
    event.stopPropagation();
    return false;
  }
}
