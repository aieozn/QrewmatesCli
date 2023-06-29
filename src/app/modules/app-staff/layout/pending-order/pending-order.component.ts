import { Component, EventEmitter, Input, Output } from '@angular/core';
import { filter, first, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { OrderDetailsGet } from '@common/api-client/models/order-details-get';
import { UpdateOrderStatusMessage } from '../../model/update-order-status-message';
import { GenericDialogStuffManagerService } from '../../services/generic-dialog-stuff-manager/generic-dialog-stuff-manager.service';
import { AcceptOrderActionDialogType } from '../../services/generic-dialog-stuff-manager/accept-order-aciton-dialog-type';
import { AcceptOrderActionResult } from '../../services/generic-dialog-stuff-manager/accept-order-action-result';
import { FullWidthDialogService } from '@common/full-width-dialog/service/full-width-dialog.service';
import { OrderInstanceControllerService } from '@common/api-client/services';
import { AccountService } from '@common/account-utils/services/account.service';
import { OrderGet } from '@common/api-client/models';
import { OrderSummaryOutputData } from '@common/order-composer/layout/order-summary/order-summary-output-data';
import { OrderWrapperTrimmer } from '@common/api-client/wrapper/order-wrapper-trimmer';

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

  constructor(private dialogService: FullWidthDialogService,
    private orderInstanceService: OrderInstanceControllerService,
    private accountService: AccountService,
    private dialogManager: GenericDialogStuffManagerService
  ) {
  }
  
  
  edit() {
    if (!this._order) { throw 'Order not defined'; }

    this.orderInstanceService.getOrder({
      restaurantRef: this.accountService.getRestaurantRef(),
      orderInstanceRef: this._order.ref
    })
    .pipe<OrderDetailsGet, { orderDetails: OrderDetailsGet, orderSummary: OrderSummaryOutputData}>(
      first(),
      switchMap(orderDetails => 
        forkJoin({
          orderDetails: of(orderDetails),
          orderSummary: this.dialogService.openSummary({
            restaurantRef: this.accountService.getRestaurantRef(),
            item: {
              ...orderDetails,
              editMode: true,
              activeElements: []
            },
            waiterMode: true
          }).afterClosed()
        })
      )
    )
    .pipe(
      filter(e => e.orderSummary.submit),
      switchMap(edited =>
        this.orderInstanceService.editOrder({
          restaurantRef: this.accountService.getRestaurantRef(),
          orderInstanceRef: edited.orderDetails.ref,
          body: OrderWrapperTrimmer.trimOrder(edited.orderSummary.order)
        })
      )
    )
    .pipe(
      tap((o) => {
        console.debug("Order upated. Waiting for socket notification")
        console.debug(o)
      }
    ))
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
