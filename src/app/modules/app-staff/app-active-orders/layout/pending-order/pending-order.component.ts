import { Component, EventEmitter, Input, Output } from '@angular/core';
import { first, map, tap } from 'rxjs';
import { UpdateOrderStatusMessage } from '../../model/update-order-status-message';
import { AcceptOrderActionDialogType } from '../../services/generic-dialog-stuff-manager/accept-order-aciton-dialog-type';
import { AcceptOrderActionResult } from '../../services/generic-dialog-stuff-manager/accept-order-action-result';
import { OrderInstanceControllerService } from '@common/api-client/services';
import { AccountService } from '@common/account-utils/services/account.service';
import { OrderGet } from '@common/api-client/models';
import { StuffDiaglogService } from '../../services/generic-dialog-stuff-manager/staff-dialog.service';

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

  @Output('changeStatus') changeStatus = new EventEmitter<UpdateOrderStatusMessage>();

  constructor(
    private orderInstanceService: OrderInstanceControllerService,
    private accountService: AccountService,
    private dialogManager: StuffDiaglogService
  ) {
  }
  
  edit() {
    if (!this._order) { throw 'Order not defined'; }

    this.orderInstanceService.getOrder({
      restaurantRef: this.accountService.getRestaurantRef(),
      orderInstanceRef: this._order.ref
    })
    .pipe(
      tap(orderDetails => this.dialogManager.openDetails(orderDetails))
    )
    .subscribe();
  }

  cancelOrder(event: Event) {
    this.doActionWithDialog(event, AcceptOrderActionDialogType.CANCEL, 'CANCEL');
  }

  rejectOrder(event: Event) {
    this.doActionWithDialog(event, AcceptOrderActionDialogType.REJECT, 'REJECT');
  }

  doActionWithDialog(event: Event, type: AcceptOrderActionDialogType, action: ('ACCEPT' | 'PAY_OFFLINE' | 'SERVE' | 'REJECT' | 'CANCEL')) {
    this.dialogManager
      .openAcceptOrderActionDialog(type)
      .pipe(
        first(),
        map(e => e as AcceptOrderActionResult)
      )
      .subscribe(e => {
        if (e.proceed) {
          this.changeStatus.emit({
            orderAction: action,
            comment: e.message
          });
        }
      });
      
    event.stopPropagation();
  }

  doAction(event: Event, action: ('ACCEPT' | 'PAY_OFFLINE' | 'SERVE' | 'REJECT' | 'CANCEL')) : boolean {
    this.changeStatus.emit({
      orderAction: action,
      comment: undefined
    });

    event.stopPropagation();

    return false;
  }
}
