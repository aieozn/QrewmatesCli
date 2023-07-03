import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuCategoryGet, OrderDetailsGet, OrderElementGet } from '@common/api-client/models';
import { MenuCategoryControllerService, OrderInstanceControllerService } from '@common/api-client/services';
import { OrderWrapper } from '@common/api-client/wrapper/order-wrapper';
import { OrderService } from 'app/common/restaurant-menu/services/order/order.service';
import { BehaviorSubject, Subject, filter, first, map, takeUntil, tap } from 'rxjs';
import { StaffDialogService } from '../service/dialog-service/staff-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderElementDataWrapper } from '@common/api-client/wrapper/order-element-data-wrapper';
import { Trimers } from 'app/modules/app-admin/app-menu/trimmer/trimmers';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnDestroy {
  categories: MenuCategoryGet[] = [];
  orderTableName: string | undefined;
  orderSubject: BehaviorSubject<OrderWrapper | undefined>;
  activeOrderRef: string | undefined;
  private readonly onDestroy = new Subject<void>();

  constructor(
    private categoriesService: MenuCategoryControllerService,
    private accountService: AccountService,
    protected orderService: OrderService,
    private orderInstanceService: OrderInstanceControllerService,
    private dialogService: StaffDialogService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categoriesService.getCategories({
      restaurantRef: accountService.getRestaurantRef()
    }).pipe(
      tap(e => this.categories = e)
    ).subscribe();
    
    this.orderSubject = orderService.orderChanged;

    this.route.params.pipe(
      tap(params => this.reloadComponent(params['orderRef'])),
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
        tap(e => {
          this.activeOrderRef = orderRef;
          this.orderTableName = e.table.name;
          this.orderService.orderChanged.next(this.wrapOrder(e))
        })
      ).subscribe();
    } else {
      this.activeOrderRef = undefined;
      this.orderTableName = undefined;
      this.orderService.orderChanged.next(undefined);
    }
  }

  wrapOrder(details: OrderDetailsGet) : OrderWrapper {
    const wrapper : OrderWrapper = {
      ...details,
      activeElements: []
    }

    const newElements: OrderElementGet[] = [];
    const newActiveElements: OrderElementDataWrapper[] = [];

    const elements = details.elements;

    for (const element of elements) {
      if (!element.hasUpdated && !element.hasDeleted) {
        newActiveElements.push({
          comment: element.comment,
          menuItem: element.menuItem.menuItem!,
          menuItemSelects: element.menuItemSelects.map(e => e.select!),
          menuItemToppings: element.menuItemToppings.map(e => e.topping!),
          price: element.price
        })
      } else {
        newElements.push(element);
      }
    }

    wrapper.elements = newElements;
    wrapper.activeElements = newActiveElements;


    return wrapper;
  }

  submit() {
    this.dialogService
      .openSummary()
      .pipe(
        first(),
        filter(e => e != undefined),
        tap(e => {
          this.orderService.updateOrder(e.order)
        }),
        filter(e => e.submit),
        map(e => e.order)
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  save() {
    const order = this.orderService.orderChanged.getValue();
    const orderRef = this.activeOrderRef;
    if (!order || !orderRef) throw 'Order not defined';

    this.orderInstanceService.editOrder({
      restaurantRef: this.accountService.getRestaurantRef(),
      orderInstanceRef: orderRef,
      body: {
        comment: order.comment,
        elements: order.activeElements,
        elementsRefs: Trimers.trimRefList(order.elements),
        paymentMethod: order.paymentMethod,
        table: Trimers.trimRef(order.table)
      }
    }).pipe(
      tap(() => this.router.navigate(['/staff/active']))
    ).subscribe();
  }
}
