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
    protected orderService: OrderService,
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
        this.reloadComponent(params['orderRef'])
      }),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  reloadComponent(orderRef: string) {
    if (orderRef != undefined) {
      this.orderInstanceService.getOrder({
        restaurantRef: this.accountService.getRestaurantRef(),
        orderInstanceRef: orderRef
      }).pipe(
        filter(e => e != undefined),
        tap(e => this.orderService.orderChanged.next({
          ...e,
          activeElements: []
        }))
      ).subscribe();
    } else {
      this.orderService.orderChanged.next(undefined);
    }
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
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
