import { Component, OnDestroy } from '@angular/core';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { AccountService } from '@common/account-utils/services/account.service';
import { RestaurantControllerService } from '@common/api-client/services';
import { CollectiveChangesService } from '../services/collective-changes/collective-changes.service';
import { AdminCustomizationService } from './admin-customization.service';

@Component({
  selector: 'app-admin-customization',
  templateUrl: './admin-customization.component.html',
  styleUrls: ['./admin-customization.component.scss']
})
export class AdminCustomizationComponent implements OnDestroy {
  private readonly onDestroy = new Subject<void>();

  constructor(
    accountService: AccountService,
    private collectiveChanges: CollectiveChangesService,
    private restaurantService: RestaurantControllerService,
    private customizationService: AdminCustomizationService
  ) {
    accountService.getRestaurantDetails().pipe(
      tap(r => this.customizationService.setRestaurant(r))
    ).subscribe();

    this.customizationService.getUpdated().pipe(
      tap(v => this.collectiveChanges.modified.next(v)),
      takeUntil(this.onDestroy)
    ).subscribe()

    this.collectiveChanges.publish.pipe(
      switchMap(() => {
        const r = this.customizationService.getRestaurantValue();
        return this.restaurantService.putRestaurant({
          restaurantRef: r!.ref,
          body: r!
        })
      }),
      tap(r => {
        this.customizationService.setRestaurant(r);
        this.collectiveChanges.modified.next(false);
      }),
      takeUntil(this.onDestroy)
    ).subscribe()
  }
  
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
