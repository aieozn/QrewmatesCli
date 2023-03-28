import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, first, map, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { GenericDialogCliManager } from '../services/generic-dialog-cli-manager/generic-dialog-cli-manager';
import { OrderService } from '../services/order/order.service';
import { DialogManagerService } from '../services/dialog-manager/dialog-manager.service';
import { MenuCategoryGet, OrderDetailsGet, RestaurantGet } from 'src/app/common/api-client/models';
import { OrderWrapper } from 'src/app/common/api-client/wrapper/order-wrapper';
import { MenuCategoryControllerService } from 'src/app/common/api-client/services';
import { AccountService } from 'src/app/common/account-utils/services/account.service';

@Component({
  selector: 'app-client',
  templateUrl: './app-client.component.html',
  styleUrls: ['./app-client.component.scss']
})
export class AppClientComponent implements OnInit, OnDestroy {

  private createdOrderCookieName = 'qr-last-order-created-ref';
  public backgroundImageUrl = new Observable<string>();

  public categories: Observable<MenuCategoryGet[]>;

  public order: OrderWrapper | undefined;

  // Display black cover over items
  public shadowItems = false;

  // Menu-cli is always active so multiple css loads shouldn't occuse
  // Just in case there is alse this variable to prevent such a situation
  private cssLoaded = false;

  private readonly onDestroy = new Subject<void>();

  constructor(
    private categoriesService: MenuCategoryControllerService,
    private menuCliDialogServide: GenericDialogCliManager,
    private dialogManager: DialogManagerService,
    private accountService: AccountService,
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

    
    var restaurantRef = this.accountService.getRestaurantRef();
    this.loadCustomCss(restaurantRef);

    // Subscribe categories
    this.categories = this.categoriesService.getCategories({
      "restaurantRef": restaurantRef
    });

    // Subscribe order update
    this.orderService.orderChanged.pipe(
      takeUntil(this.onDestroy)
    ).subscribe((order) => {
      this.order = order;
    });

    // Subscribe restaurant
    this.backgroundImageUrl = this.accountService.getRestaurant()
      .pipe(
        map(e => this.getBackgroundCssImageUrl(e))
      );
  }

  private getBackgroundCssImageUrl(restaurant : RestaurantGet) {
    if (restaurant.backgroundImage) {
      let url = this.accountService.getMultimediaUrl(restaurant.backgroundImage.ref);
      return 'url(' + url + ')';
    } else {
      return 'none';
    }
  }

  private loadLastOrder(lastOrder: OrderDetailsGet) {
    this.dialogManager.openWaitForOrderDialog(lastOrder.restaurantRef, lastOrder.ref)
      .pipe(first())
      .subscribe(e => {
        this.clearCookie();
      });
  }

  private loadLastOrderHandleError() {
    this.menuCliDialogServide.openErrorDialog({
      title: $localize`Wystąpił błąd`,
      message: $localize`Nie odnaleziono zamówienia`
    }).pipe(
      first()
    ).subscribe(_ => {
      this.clearCookie();
    });
  }

  ngOnInit(): void {

  }

  private clearCookie() {
    this.cookiesService.delete(this.createdOrderCookieName)
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
          let expires : Date = new Date();
          expires.setHours(new Date().getHours() + 6)

          this.cookiesService.set(this.createdOrderCookieName, JSON.stringify({
            ref: result.ref,
            restaurantRef: result.restaurantRef
          }),
          // Expires after 6 hours
          expires
          )
        }),
        switchMap(createdOrder => this.dialogManager.openWaitForOrderDialog(createdOrder.restaurantRef, createdOrder.ref)),
        tap(result => {
          console.debug("Order responded");
          console.debug(result);
        })
      ).subscribe();
  }

  private loadCustomCss(ref: string) {
    if (!this.cssLoaded) {
      var head  = document.getElementsByTagName('head')[0];
      var link  = document.createElement('link');
      link.rel  = 'stylesheet';
      link.type = 'text/css';
      link.href = `/api/public/v1/restaurant/${ref}/styles/styles.css`
      link.media = 'all';
      head.appendChild(link);
      this.cssLoaded = true;
    }
    
  }
}
