import { Component, EventEmitter, Input, Output } from '@angular/core';
import { filter, first, map, switchMap, tap } from 'rxjs';
import { UpdateOrderStatusMessage } from '../../model/update-order-status-message';
import { AcceptOrderActionDialogType } from '../../services/generic-dialog-stuff-manager/accept-order-aciton-dialog-type';
import { AcceptOrderActionResult } from '../../services/generic-dialog-stuff-manager/accept-order-action-result';
import { OrderInstanceControllerService } from '@common/api-client/services';
import { AccountService } from '@common/account-utils/services/account.service';
import { OrderGet } from '@common/api-client/models';
import { StuffDiaglogService } from '../../services/generic-dialog-stuff-manager/staff-dialog.service';
import { UserActions } from 'app/common/translators';

@Component({
  selector: 'app-pending-order',
  templateUrl: './pending-order.component.html',
  styleUrls: ['./pending-order.component.scss']
})
export class PendingOrderComponent {

  _order: OrderGet | undefined;

  @Input('order') set order(value: OrderGet) {
    this._order = value;

    if (this._order.ref == 'O0PT00000012') {
      this.edit()
    }
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
      switchMap(orderDetails => this.dialogManager.openDetails(orderDetails)),
      filter(e => e !== undefined && e.doAction !== undefined),
      map(e => e!.doAction as UserActions),
      tap(e => this.handleAction(e))
    )
    .subscribe();
  }

  doAction(event: Event, action: UserActions) : boolean {
    this.handleAction(action);
    event.stopPropagation();

    return false;
  }

  handleAction(action: UserActions) {
    if (['REJECT', 'CANCEL'].includes(action)) {
      this.handleActionWithDialog(action as AcceptOrderActionDialogType)
    } else {

      this.changeStatus.emit({
        orderAction: action,
        comment: undefined
      });
    }
  }

  handleActionWithDialog(type: AcceptOrderActionDialogType) {
    this.dialogManager
      .openAcceptOrderActionDialog(type)
      .pipe(
        first(),
        map(e => e as AcceptOrderActionResult)
      )
      .subscribe(e => {
        if (e.proceed) {
          this.changeStatus.emit({
            orderAction: type,
            comment: e.message
          });
        }
      });
  }
}
