import { Component, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuCategoryGet, OrderDetailsGet, OrderElementGet } from '@common/api-client/models';
import { MenuCategoryControllerService, OrderInstanceControllerService } from '@common/api-client/services';
import { OrderElementDataWrapper } from '@common/api-client/wrapper/order-element-data-wrapper';
import { OrderWrapper } from '@common/api-client/wrapper/order-wrapper';
import { OrderWrapperTrimmer } from '@common/api-client/wrapper/order-wrapper-trimmer';
import { OrderService } from 'app/common/restaurant-menu/services/order/order.service';
import { BehaviorSubject, Subject, filter, first, map, takeUntil, tap } from 'rxjs';
import { Trimers } from '../../app-menu/trimmer/trimmers';
import { RESTAURANT_MENU_DIALOG_MANAGER_TOKEN } from 'app/common/restaurant-menu/restaurant-menu.module';
import { RestaurantMenuDialogManager } from 'app/common/restaurant-menu/services/dialog-manager/restaurant-menu-dialog-manager';
import { EditOrderDialogService } from '../services/edit-order-dialog.service';

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
    private route: ActivatedRoute,
    private router: Router,
    private dialogManager: EditOrderDialogService
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
    this.dialogManager.openSummary()
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
        comment: order.comment ? order.comment : undefined,
        elements: order.activeElements
          .sort((a, b) => a.menuItem.ref.localeCompare(b.menuItem.ref))
          .map(e => OrderWrapperTrimmer.trimOrderElement(e)),
        elementsRefs: Trimers.trimRefList(order.elements),
        paymentMethod: order.paymentMethod,
        table: Trimers.trimRef(order.table)
      }
    }).pipe(
      tap(() => this.router.navigate(['/admin/orders']))
    ).subscribe();
  }
}
