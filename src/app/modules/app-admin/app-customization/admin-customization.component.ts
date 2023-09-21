import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, filter, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { AccountService } from '@common/account-utils/services/account.service';
import { RestaurantControllerService } from '@common/api-client/services';
import { CollectiveChangesService } from '../services/collective-changes/collective-changes.service';
import { AdminCustomizationService } from './admin-customization.service';
import { RestaurantDetailsGet } from '@common/api-client/models';
import { ErrorDialogManager } from 'app/common/dialogs/error-dialog/services/error-dialog-manager.service';

@Component({
  selector: 'app-admin-customization',
  templateUrl: './admin-customization.component.html',
  styleUrls: ['./admin-customization.component.scss']
})
export class AdminCustomizationComponent implements OnDestroy {
  private readonly onDestroy = new Subject<void>();

  restaurant: Observable<RestaurantDetailsGet | undefined>;

  private INVALID_CONFIGURATION_TITLE = $localize`Invalid configuration`;
  private TABLE_ORDER_NO_PAYMENT_METHOD_MESSAGE = $localize`No payment method is available for table orders`;
  private ONSITE_ORDER_NO_PAYMENT_METHOD_MESSAGE = $localize`No payment method is available for onsite orders`;

  constructor(
    accountService: AccountService,
    private collectiveChanges: CollectiveChangesService,
    private restaurantService: RestaurantControllerService,
    private customizationService: AdminCustomizationService,
    private errorDialogService: ErrorDialogManager
  ) {
    accountService.getRestaurantDetails().pipe(
      tap(r => this.customizationService.setRestaurant(r))
    ).subscribe();

    this.customizationService.getUpdated().pipe(
      tap(v => this.collectiveChanges.modified.next(v)),
      takeUntil(this.onDestroy)
    ).subscribe()

    this.collectiveChanges.publish.pipe(
      switchMap(() => this.publishRestaurant()),
      filter(r => r != undefined),
      map(r => r as RestaurantDetailsGet),
      tap(r => {
        this.customizationService.setRestaurant(r);
        this.collectiveChanges.modified.next(false);
      }),
      takeUntil(this.onDestroy)
    ).subscribe()

    this.restaurant = this.customizationService.getRestaurant()
  }

  private publishRestaurant() : Observable<RestaurantDetailsGet | undefined> {
    const r = this.customizationService.getRestaurantValue();

    if (!r.tableOrderConfig.onlinePaymentEnabled && !r.tableOrderConfig.overduePaymentEnabled) {
      this.errorDialogService.open({
        title: this.INVALID_CONFIGURATION_TITLE,
        message: this.TABLE_ORDER_NO_PAYMENT_METHOD_MESSAGE
      })

      return of();
    }

    if (!r.onsiteOrderConfig.onlinePaymentEnabled && !r.onsiteOrderConfig.overduePaymentEnabled) {
      this.errorDialogService.open({
        title: this.INVALID_CONFIGURATION_TITLE,
        message: this.ONSITE_ORDER_NO_PAYMENT_METHOD_MESSAGE
      })

      return of();
    }

    return this.restaurantService.putRestaurant({
      restaurantRef: r!.ref,
      body: r!
    })
  }
  
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  toogleEnableTableOrder(value: boolean) {
    const restaurant = this.customizationService.getRestaurantValue()
    restaurant.tableOrderConfig.enabled = value;
    this.customizationService.updateRestaurant(restaurant);
  }

  toogleEnableOnsiteOrder(value: boolean) {
    const restaurant = this.customizationService.getRestaurantValue()
    restaurant.onsiteOrderConfig.enabled = value;
    this.customizationService.updateRestaurant(restaurant);
  }

  toogleEnableOnlineOrder(value: boolean) {
    const restaurant = this.customizationService.getRestaurantValue()
    restaurant.onlineOrderConfig.enabled = value;
    this.customizationService.updateRestaurant(restaurant);
  }

  toogleTableOnlinePayment(value: boolean) {
    const restaurant = this.customizationService.getRestaurantValue()
    restaurant.tableOrderConfig.onlinePaymentEnabled = value;
    this.customizationService.updateRestaurant(restaurant);
  }

  toogleOnsiteOnlinePayment(value: boolean) {
    const restaurant = this.customizationService.getRestaurantValue()
    restaurant.onsiteOrderConfig.onlinePaymentEnabled = value;
    this.customizationService.updateRestaurant(restaurant);
  }

  toogleOnlineOrderOnlinePayment(value: boolean) {
    const restaurant = this.customizationService.getRestaurantValue()
    restaurant.onlineOrderConfig.onlinePaymentEnabled = value;
    this.customizationService.updateRestaurant(restaurant);
  }

  toogleTableOverduePayment(value: boolean) {
    const restaurant = this.customizationService.getRestaurantValue()
    restaurant.tableOrderConfig.overduePaymentEnabled = value;
    this.customizationService.updateRestaurant(restaurant);
  }

  toogleOnsiteOverduePayment(value: boolean) {
    const restaurant = this.customizationService.getRestaurantValue()
    restaurant.onsiteOrderConfig.overduePaymentEnabled = value;
    this.customizationService.updateRestaurant(restaurant);
  }

  toogleOnlineOrderOverdueCashPayment(value: boolean) {
    const restaurant = this.customizationService.getRestaurantValue()
    restaurant.onlineOrderConfig.overdueCashPaymentEnabled = value;
    this.customizationService.updateRestaurant(restaurant);
  }

  toogleOnlineOrderOverdueCardPayment(value: boolean) {
    const restaurant = this.customizationService.getRestaurantValue()
    restaurant.onlineOrderConfig.overdueCardPaymentEnabled = value;
    this.customizationService.updateRestaurant(restaurant);
  }

  toogleCallWaiter(value: boolean) {
    const restaurant = this.customizationService.getRestaurantValue()
    restaurant.tableOrderConfig.callWaiter = value;
    this.customizationService.updateRestaurant(restaurant);
  }
}
