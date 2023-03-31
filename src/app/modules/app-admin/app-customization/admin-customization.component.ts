import { Component, OnDestroy } from '@angular/core';
import { Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { AccountService } from '@common/account-utils/services/account.service';
import { RestaurantDetailsGet } from '@common/api-client/models';
import { RestaurantControllerService } from '@common/api-client/services';
import { CollectiveChangesService } from '../services/collective-changes/collective-changes.service';

@Component({
  selector: 'app-admin-customization',
  templateUrl: './admin-customization.component.html',
  styleUrls: ['./admin-customization.component.scss']
})
export class AdminCustomizationComponent implements OnDestroy {

  restaurant: Observable<RestaurantDetailsGet>;

  private readonly onDestroy = new Subject<void>();

  constructor(
    accountService: AccountService,
    private collectiveChanges: CollectiveChangesService,
    private restaurantService: RestaurantControllerService
  ) {
    this.restaurant = accountService.getRestaurantDetails();

    this.collectiveChanges.publish.pipe(
      takeUntil(this.onDestroy),
      switchMap(_ => this.restaurant)
    ).subscribe(activeRestaurant => {
      this.restaurant = this.restaurantService.putRestaurant({
        restaurantRef: activeRestaurant.ref,
        body: activeRestaurant
      })

      this.collectiveChanges.modified.next(false);
    });
  }
  
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  restaurantUpdated(updated: RestaurantDetailsGet) {
    this.collectiveChanges.modified.next(true);
    this.restaurant = of(updated);
  }
  
}
