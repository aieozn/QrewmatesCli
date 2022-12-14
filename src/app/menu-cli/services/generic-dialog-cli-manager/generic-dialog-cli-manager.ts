import { Injectable } from '@angular/core';
import { MenuItemGroupGet } from 'src/app/openapi-cli/models';
import { AboutUsComponent } from '../../layout/footer/about-us/about-us.component';
import { GenericDialogService } from 'src/app/shared/generic-dialog/service/generic-dialog.service';
import { OrderSummaryComponent } from 'src/app/shared/order-form/layout/order-summary/order-summary.component';
import { RestaurantService } from '../../../shared/menu-horizontal/service/restaurant/restaurant.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderElementDataWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-element-data-wrapper';
import { OrderService } from '../order/order.service';
import { filter, first, Observable, switchMap, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GenericDialogCliManager {

  constructor(private dialogService: GenericDialogService,
    private restaurantService: RestaurantService,
    private dialog: MatDialog,
    private orderService: OrderService
  ) { }

  public openAboutUs() {
    // TODO fix AboutUsComponent title
    this.dialog.open(AboutUsComponent, GenericDialogService.getDefaultGenericDialogConfig({}))
  }

  public openAddItem(group: MenuItemGroupGet) : Observable<OrderElementDataWrapper[] | undefined> {
    return this.dialogService.openMenuItemComponent({
      group: group,
      item: undefined,
      restaurantRef: this.restaurantService.getRestaurantRef(),
      editMode: false
    }).afterClosed().pipe(first());
  }

  public openEditItem(group: MenuItemGroupGet, item: OrderElementDataWrapper) : Observable<OrderElementDataWrapper[] | undefined> {
    return this.dialogService.openMenuItemComponent({
      group: group,
      item: item,
      restaurantRef: this.restaurantService.getRestaurantRef(),
      editMode: true
    }).afterClosed().pipe(first());
  }

  public openSummary() {
    // TODO fix title
    this.dialog
      .open(OrderSummaryComponent, GenericDialogService.getDefaultGenericDialogConfig({
        restaurantRef: this.restaurantService.getRestaurantRef(),
        item: this.orderService.getOrder()
      }))
      .afterClosed()
      .pipe(
        first(),
        filter(e => e !== undefined),
        switchMap(newItem => this.orderService.submit(newItem)),
        tap(result => {
          console.log("Order created");
          console.log(result);
        })
      ).subscribe();
  }
}
