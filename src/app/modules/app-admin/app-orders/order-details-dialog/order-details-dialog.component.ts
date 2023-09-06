import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@common/account-utils/services/account.service';
import { OrderDetailsGet } from '@common/api-client/models';
import { OrderInstanceControllerService } from '@common/api-client/services';
import { ManageOrderStatusService } from 'app/common/services/manage-order-status/manage-order-status.service';
import { UserAction } from 'app/common/translators';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.scss']
})
export class OrderDetailsDialogComponent implements OnDestroy {

  private readonly onDestroy = new Subject<void>();
  order: OrderDetailsGet | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private orderService: OrderInstanceControllerService,
    private manageOrderStatusService: ManageOrderStatusService
  ) {
    route.params.pipe(
      tap(params => this.load(params['orderRef'])),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  close() {
    this.router.navigate(['.'], {relativeTo: this.route.parent})
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  load(ref: string) {
    this.orderService.getOrder({
      restaurantRef: this.accountService.getRestaurantRef(),
      orderInstanceRef: ref
    }).pipe(
      tap(e => this.order = e)
    ).subscribe()
  }

  closeWithAction(order: OrderDetailsGet, action: UserAction) {
    this.manageOrderStatusService.handleAction(order.restaurantRef, order.ref, action);
    this.close()
  }

  edit(ref: string) {
    this.router.navigate(['/admin/orders/edit', ref])
  }
}
