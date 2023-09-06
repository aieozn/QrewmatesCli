import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@common/account-utils/services/account.service';
import { OrderDetailsGet } from '@common/api-client/models';
import { OrderInstanceControllerService } from '@common/api-client/services';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-order-detials-page',
  templateUrl: './order-detials-page.component.html',
  styleUrls: ['./order-detials-page.component.scss']
})
export class OrderDetialsPageComponent implements OnDestroy {

  private readonly onDestroy = new Subject<void>();
  order: OrderDetailsGet | undefined;

  constructor(
    private orderService: OrderInstanceControllerService,
    route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {
    route.params.pipe(
      tap(params => this.load(params['orderRef'])),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  load(ref: string | undefined) {
    if (ref !== undefined) {
      this.orderService.getOrder({
        restaurantRef: this.accountService.getRestaurantRef(),
        orderInstanceRef: ref
      }).pipe(
        tap(e => this.order = e)
      ).subscribe();
    } else {
      this.order = undefined;
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
  
  close() {
    this.router.navigate(['/admin/history'])
  }
}
