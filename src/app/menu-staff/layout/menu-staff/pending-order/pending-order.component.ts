import { Component, Input } from '@angular/core';
import { filter, first, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { AccountService } from 'src/app/menu-staff/services/account/account.service';
import { OrderGet } from 'src/app/openapi-cli/models';
import { OrderDetailsGet } from 'src/app/openapi-cli/models/order-details-get';
import { OrderInstanceControllerService } from 'src/app/openapi-cli/services';
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

  public constructor(private dialogService: GenericDialogService,
    private orderService: OrderInstanceControllerService,
    private accountService: AccountService) {
    
  }
  
  public edit() {
    if (!this._order) { throw 'Order not defined'; }

    this.orderService.getOrder({
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
        this.orderService.editOrder({
          restaurantRef: this.accountService.getRestaurantRef(),
          ref: edited.orderDetails.ref,
          body: edited.orderWrapper
        })
      )
    )
    .pipe(
      tap((o) => {
        console.log("Order upated. Waiting for socket notification")
        console.log(o)
      }
    ))
    .subscribe();
  }
}
