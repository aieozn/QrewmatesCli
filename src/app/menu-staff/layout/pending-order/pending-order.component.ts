import { Component, EventEmitter, Input, Output } from '@angular/core';
import { filter, first, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { UpdateOrderStatusMessage } from 'src/app/menu-staff/model/update-order-status-message';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { AcceptOrderActionDialogType } from 'src/app/menu-staff/services/generic-dialog-stuff-manager/accept-order-aciton-dialog-type';
import { AcceptOrderActionResult } from 'src/app/menu-staff/services/generic-dialog-stuff-manager/accept-order-action-result';
import { GenericDialogStuffManagerService } from 'src/app/menu-staff/services/generic-dialog-stuff-manager/generic-dialog-stuff-manager.service';
import { OrderGet } from 'src/app/openapi-cli/models';
import { OrderDetailsGet } from 'src/app/openapi-cli/models/order-details-get';
import { MenuItemControllerService, OrderInstanceControllerService } from 'src/app/openapi-cli/services';
import { GenericDialogService } from 'src/app/shared/generic-dialog/service/generic-dialog.service';
import { OrderWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-wrapper';

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

  public constructor(private dialogService: GenericDialogService,
    private orderInstanceService: OrderInstanceControllerService,
    private accountService: AccountService,
    private dialogManager: GenericDialogStuffManagerService
  ) {
  }
  
  
  public edit() {
    if (!this._order) { throw 'Order not defined'; }

    this.orderInstanceService.getOrder({
      restaurantRef: this.accountService.getRestaurantRef(),
      ref: this._order.ref
    })
    .pipe<OrderDetailsGet, { orderDetails: OrderDetailsGet, orderWrapper: OrderWrapper}>(
      first(),
      switchMap(orderDetails => 
        forkJoin({
          orderDetails: of(orderDetails),
          orderWrapper: this.dialogService.openSummary({
            restaurantRef: this.accountService.getRestaurantRef(),
            item: Object.assign({ editMode: true }, orderDetails),
          }).afterClosed()
        })
      )
    )
    .pipe(
      filter(e => e.orderWrapper !== undefined),
      switchMap(edited =>
        this.orderInstanceService.editOrder({
          restaurantRef: this.accountService.getRestaurantRef(),
          ref: edited.orderDetails.ref,
          body: edited.orderWrapper
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

  public cancelOrder(event: Event) {
    this.doActionWithDialog(event, AcceptOrderActionDialogType.CANCEL, 'CANCEL');
  }

  public rejectOrder(event: Event) {
    this.doActionWithDialog(event, AcceptOrderActionDialogType.REJECT, 'REJECT');
  }

  public doActionWithDialog(event: Event, type: AcceptOrderActionDialogType, action: ('ACCEPT' | 'PAY_OFFLINE' | 'SERVE' | 'REJECT' | 'CANCEL')) {
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

  public doAction(event: Event, action: ('ACCEPT' | 'PAY_OFFLINE' | 'SERVE' | 'REJECT' | 'CANCEL')) : boolean {
    this.changeStatus.emit({
      orderAction: action,
      comment: undefined
    });

    event.stopPropagation();

    return false;
  }
}
