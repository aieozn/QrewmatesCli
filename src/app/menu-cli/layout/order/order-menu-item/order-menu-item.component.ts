import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, filter, flatMap, Subject, switchMap, takeUntil } from 'rxjs';
import { CliDialogBodyContent } from 'src/app/menu-cli/menu-cli-dialog/model/cli-dialog-body-content';
import { RestaurantService } from 'src/app/menu-cli/services/restaurant/restaurant.service';
import { OrderElementDataWrapper } from 'src/app/openapi-cli-wrapper/order/order-element-data-wrapper';
import { MenuItemDetailedGet, MenuItemGet, MenuItemGroupGet } from 'src/app/openapi-cli/models';
import { MenuItemControllerService } from 'src/app/openapi-cli/services';

@Component({
  selector: 'app-order-menu-item',
  templateUrl: './order-menu-item.component.html',
  styleUrls: ['./order-menu-item.component.scss']
})
export class OrderMenuItemComponent implements CliDialogBodyContent, OnDestroy {

  public selectedItem$ = new BehaviorSubject<MenuItemDetailedGet | undefined>(undefined);
  public group: MenuItemGroupGet | undefined;
  public menuItemGroupImageUrl: string | undefined;
  public order: OrderElementDataWrapper | undefined;

  public selectItem$ = new BehaviorSubject<MenuItemGet | undefined>(undefined);

  private readonly onDestroy = new Subject<void>();
  

  constructor(
    private menuItemDetailsService: MenuItemControllerService,
    private restaurantService: RestaurantService
  ) {
    this.selectItem$.pipe(
      distinctUntilChanged(),
      filter(x => x !== undefined),
      switchMap(item => this.menuItemDetailsService.getItemDetails({
        restaurantRef: this.restaurantService.getRestaurantRef(),
        ref: item!.ref
      }))
    ).pipe(
      takeUntil(this.onDestroy)
    ).subscribe((item) => {
      this.order = {
        menuItem: item,
        selects: [],
        toppings: [],
        price: item.price
      }

      console.log(item);
      this.selectedItem$.next(item);
    })
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  setData(data: { group : MenuItemGroupGet }): void {
    if (!data.group) {
      console.error("Group not found");
    } else {
      this.group = data.group;
      this.loadItems(this.group);
    }
  }

  private loadItems(group: MenuItemGroupGet) {
    if (group.image) {
      this.menuItemGroupImageUrl = this.restaurantService.getMultimediaUrl(group.image.ref)
    }
    this.selectItem$.next(group.menuItems[0]);
  }
}
