import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, first, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { MenuCategoryGet, OrderDetailsGet, OrderGet } from 'src/app/openapi-cli/models';
import { MenuCategoryControllerService } from 'src/app/openapi-cli/services';
import { GenericDialogCliManager } from "../services/generic-dialog-cli-manager/generic-dialog-cli-manager";
import { RestaurantService } from '../../shared/menu-horizontal/service/restaurant/restaurant.service';
import { OrderService } from '../services/order/order.service';
import { OrderWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-wrapper';
import { CookieService } from 'ngx-cookie-service';
import { ConstValues } from '../config/const-values';

@Component({
  selector: 'app-menu-cli',
  templateUrl: './menu-cli.component.html',
  styleUrls: ['./menu-cli.component.scss']
})
export class MenuCliComponent implements OnInit, OnDestroy {

  private createdOrderCookieName = 'qr-last-order-created';

  public categories: MenuCategoryGet[] = [];

  public order: OrderWrapper | undefined;

  // Display black cover over items
  public shadowItems = false;

  private readonly onDestroy = new Subject<void>();

  constructor(
    private categoriesService: MenuCategoryControllerService,
    private menuCliDialogServide: GenericDialogCliManager,
    private restaurantService: RestaurantService,
    private orderService: OrderService,
    private cookiesService: CookieService
  ) {
    let cookieValue = cookiesService.get(this.createdOrderCookieName);

    // TODO edytowanie zamówienia nie powinno być możliwe do czasu pobrania informacji o poprzednim zamowieniu
    if (cookieValue) {
      let cookieObject : {
        ref: any,
        restaurantRef: any
      } = JSON.parse(cookieValue);

     this.orderService.loadOrder(cookieObject)
        .pipe(
          first()
        ).subscribe({
          next: this.loadLastOrder.bind(this),
          error: this.loadLastOrderHandleError.bind(this)
        });
    }
  }

  private loadLastOrder(lastOrder: OrderDetailsGet) {
    if (ConstValues.ProcessingStatuses.includes(lastOrder.orderStatus)) {
      this.menuCliDialogServide.openWaitForOrderDialog(lastOrder.restaurantRef, lastOrder.ref);
    } else {
      // Cookie has not been changed
      this.clearCookie();
    }
  }

  private loadLastOrderHandleError() {
    this.menuCliDialogServide.openErrorDialog({
      title: "Wystąpił błąd",
      message: "Nie odnaleziono zamówienia"
    }).pipe(
      first()
    ).subscribe(_ => {
      this.clearCookie();
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  private clearCookie() {
    this.cookiesService.delete(this.createdOrderCookieName)
  }

  private async loadCategories() {
    var restaurantRef = this.restaurantService.getRestaurantRef();

    this.categoriesService.getCategories1({
      "restaurantRef": restaurantRef
    }).pipe(
      takeUntil(this.onDestroy)
    ).subscribe((categories) => {
      this.categories = categories;
    });

    this.orderService.orderChanged.pipe(
      takeUntil(this.onDestroy)
    ).subscribe((order) => {
      this.order = order;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  showAboutUs() {
    this.menuCliDialogServide.openAboutUs()
  }

  public submit() {
    this.menuCliDialogServide
      .openSummary()
      .pipe(
        first(),
        filter(e => e !== undefined),
        switchMap(newItem => this.orderService.submit(newItem)),
        tap(result => {
          console.debug("Order created");
          console.debug(result);
          this.cookiesService.set(this.createdOrderCookieName, JSON.stringify({
            ref: result.ref,
            restaurantRef: result.restaurantRef
          }))
        }),
        switchMap(createdOrder => this.menuCliDialogServide.openWaitForOrderDialog(createdOrder.restaurantRef, createdOrder.ref)),
        tap(result => {
          console.debug("Order responded");
          console.debug(result);
        })
      ).subscribe();
  }
}

