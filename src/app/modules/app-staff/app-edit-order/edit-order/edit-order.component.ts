import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuCategoryGet } from '@common/api-client/models';
import { MenuCategoryControllerService, OrderInstanceControllerService } from '@common/api-client/services';
import { OrderWrapper } from '@common/api-client/wrapper/order-wrapper';
import { OrderService } from 'app/common/restaurant-menu/services/order/order.service';
import { BehaviorSubject, Subject, filter, first, map, takeUntil, tap } from 'rxjs';
import { StaffDialogService } from '../service/dialog-service/staff-dialog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnDestroy {
  categories: MenuCategoryGet[] = [];
  orderSubject: BehaviorSubject<OrderWrapper | undefined>;
  private readonly onDestroy = new Subject<void>();

  constructor(
    private categoriesService: MenuCategoryControllerService,
    private accountService: AccountService,
    private orderService: OrderService,
    private orderInstanceService: OrderInstanceControllerService,
    private dialogService: StaffDialogService,
    private route: ActivatedRoute
  ) {
    this.categoriesService.getCategories({
      restaurantRef: accountService.getRestaurantRef()
    }).pipe(
      tap(e => this.categories = e)
    ).subscribe();
    
    this.orderSubject = orderService.orderChanged;

    this.route.params.pipe(
      tap(params => {
        this.reloadComponent(params['categoryRef'])
      }),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  reloadComponent(orderRef: string) {
    this.orderInstanceService.getOrder({
      restaurantRef: this.accountService.getRestaurantRef(),
      orderInstanceRef: orderRef
    }).pipe(
      tap(e => this.orderService.orderChanged.next({
        ...e,
        editMode: true,
        activeElements: []
      }))
    ).subscribe();
  }

  submit() {
    this.dialogService
      .openSummary()
      .pipe(
        first(),
        tap(e => {
          this.orderService.updateOrder(e.order)
        }),
        filter(e => e.submit),
        map(e => e.order),
        tap(e => console.log(e))
        // switchMap(newItem => this.orderService.submit(newItem)),
        // tap(result => {
        //   console.debug("Order created");
        //   console.debug(result);
        //   const expires : Date = new Date();
        //   expires.setTime(new Date().getTime() + 6 * (1000 * 60 * 60))

        //   this.cookiesService.set(this.createdOrderCookieName, JSON.stringify({
        //     ref: result.ref,
        //     restaurantRef: result.restaurantRef
        //   }),
        //   // Expires after 6 hours
        //   expires
        //   )
        // }),
        // switchMap(createdOrder => this.dialogManager.openWaitForOrderDialog(createdOrder.restaurantRef, createdOrder.ref)),
        // tap(result => {
        //   console.debug("Order responded");
        //   console.debug(result);
        // })
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
