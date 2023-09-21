import { Component, OnDestroy } from '@angular/core';
import { filter, first, map, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { OrderService } from '../../../common/restaurant-menu/services/order/order.service';
import { MenuCategoryGet, OrderDetailsGet, RestaurantGet } from '@common/api-client/models';
import { OrderWrapper } from '@common/api-client/wrapper/order-wrapper';
import { MenuCategoryControllerService } from '@common/api-client/services';
import { AccountService } from '@common/account-utils/services/account.service';
import { ErrorDialogManager } from 'app/common/dialogs/error-dialog/services/error-dialog-manager.service';
import { DialogManagerService } from '../services/dialog-manager/dialog-manager.service';
import { RestaurantMenuDialogManager } from 'app/common/restaurant-menu/services/dialog-manager/restaurant-menu-dialog-manager';

@Component({
  selector: 'app-client',
  templateUrl: './app-client.component.html',
  styleUrls: ['./app-client.component.scss']
})
export class AppClientComponent implements OnDestroy {

  private createdOrderRefCookieName = 'qr-last-order-created-ref';
  private createdOrderLocalCookieName = 'qr-last-order-created-local';

  backgroundImageUrl = new Observable<string>();

  categories: Observable<MenuCategoryGet[]>;

  // Display black cover over items
  shadowItems = false;

  // Menu-cli is always active so multiple css loads shouldn't occuse
  // Just in case there is alse this variable to prevent such a situation
  private cssLoaded = false;

  private readonly onDestroy = new Subject<void>();

  constructor(
    private categoriesService: MenuCategoryControllerService,
    private dialogManager: DialogManagerService,
    private accountService: AccountService,
    protected orderService: OrderService,
    private cookiesService: CookieService,
    private errorDialogManager: ErrorDialogManager,
    private restaurantDialogManager: RestaurantMenuDialogManager
  ) {
    const restaurantRef = this.accountService.getRestaurantRef();

    // Subscribe categories
    this.categories = this.categoriesService.getCategories({
      "restaurantRef": restaurantRef
    });

    // Subscribe order update
    this.orderService.orderChanged.pipe(
      filter(e => e !== undefined),
      map(e => e as OrderWrapper),
      tap(e => this.saveOrderCookie(e)),
      takeUntil(this.onDestroy)
    ).subscribe();

    // Subscribe restaurant
    this.backgroundImageUrl = this.accountService.getRestaurant().pipe(
      map(e => this.getBackgroundCssImageUrl(e))
    );

    this.loadPendingOrderState();
    this.loadOrderFromCookies();
    
    this.loadCustomCss(restaurantRef);
  }

  private getCleanOrder(): OrderWrapper {
    return {
      price: 0,
      comment: undefined,
      activeElements: [],
      elements: [],
      paymentMethod: 'CASH',
      table: {
        ref: this.accountService.getTableRef()
      }
    }
  }

  private loadPendingOrderState() {
    const cookieValue = this.cookiesService.get(this.createdOrderRefCookieName);

    // TODO edytowanie zamówienia nie powinno być możliwe do czasu pobrania informacji o poprzednim zamowieniu
    if (cookieValue) {
      const cookieObject : {
        ref: string,
        restaurantRef: string
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

  private loadOrderFromCookies() {
    const cookieValueString = localStorage.getItem(this.createdOrderLocalCookieName);
    if (cookieValueString !== null) {
      const cookieValue: {
        order: OrderWrapper,
        created: string
      } = JSON.parse(cookieValueString);

      const expires = new Date();
      expires.setTime(new Date(cookieValue.created).getTime() + 6 * (1000 * 60 * 60))

      if (new Date() < expires) {
        this.orderService.orderChanged.next(cookieValue.order);
      } else {
        this.orderService.orderChanged.next(this.getCleanOrder());
        localStorage.removeItem(this.createdOrderLocalCookieName);
      }
    } else {
      this.orderService.orderChanged.next(this.getCleanOrder());
    }
  }

  public saveOrderCookie(order: OrderWrapper) {
    localStorage.setItem(this.createdOrderLocalCookieName, JSON.stringify({
      order: order,
      created: new Date()
    }));
  }

  private getBackgroundCssImageUrl(restaurant : RestaurantGet) {
    if (restaurant.theme.backgroundImage) {
      const url = this.accountService.getMultimediaUrl(restaurant.theme.backgroundImage.ref);
      return 'url(' + url + ')';
    } else {
      return 'none';
    }
  }

  private loadLastOrder(lastOrder: OrderDetailsGet) {
    this.dialogManager.openWaitForOrderDialog(lastOrder.restaurantRef, lastOrder.ref)
      .pipe(first())
      .subscribe(() => {
        this.clearOrderRefCookie();
      });
  }

  private loadLastOrderHandleError() {
    this.errorDialogManager.open({
      title: $localize`An error occured`,
      message: $localize`Order not found`
    }).pipe(
      first()
    ).subscribe(_ => {
      this.clearOrderRefCookie();
    });
  }

  private clearOrderRefCookie() {
    this.cookiesService.delete(this.createdOrderRefCookieName)
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  showAboutUs() {
    this.dialogManager.openAboutUs()
  }

  submit() {
    this.restaurantDialogManager
      .openSummary()
      .pipe(
        first(),
        tap(e => {
          this.orderService.updateOrder(e.order)
        }),
        filter(e => e.submit),
        map(e => e.order),
        switchMap(newItem => this.orderService.submit(newItem)),
        tap(result => {
          const expires : Date = new Date();
          expires.setTime(new Date().getTime() + 6 * (1000 * 60 * 60))

          this.orderService.orderChanged.next(this.getCleanOrder());

          this.cookiesService.set(this.createdOrderRefCookieName, JSON.stringify({
              ref: result.ref,
              restaurantRef: result.restaurantRef
            }),
            // Expires after 6 hours
            expires
          )
        }),
        switchMap(createdOrder => this.dialogManager.openWaitForOrderDialog(createdOrder.restaurantRef, createdOrder.ref))
      ).subscribe(() => this.clearOrderRefCookie());
  }

  private loadCustomCss(ref: string) {
    if (!this.cssLoaded) {
      const head  = document.getElementsByTagName('head')[0];
      const link  = document.createElement('link');
      link.rel  = 'stylesheet';
      link.type = 'text/css';
      link.href = `/api/public/v1/restaurant/${ref}/styles/styles.css`
      link.media = 'all';
      head.appendChild(link);
      this.cssLoaded = true;
    }
    
  }
}

