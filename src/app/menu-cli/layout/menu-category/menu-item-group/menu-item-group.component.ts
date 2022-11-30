import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuCliDialogService } from 'src/app/menu-cli/layout/generic-dialog/service/generic-dialog.service';
import { OrderService } from 'src/app/menu-cli/services/order/order.service';
import { RestaurantService } from 'src/app/menu-cli/services/restaurant/restaurant.service';
import { OrderWrapper } from 'src/app/openapi-cli-wrapper/order/order-wrapper';
import { MenuItemGet, MenuItemGroupGet } from 'src/app/openapi-cli/models';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item-group.component.html',
  styleUrls: ['./menu-item-group.component.scss']
})
export class MenuItemComponent implements OnInit, OnDestroy {

  _group: MenuItemGroupGet | undefined;
  menuItemGroupImageUrl: string | undefined;

  orderedItefsOfType = 0;
  orderUpdatedSubscription: Subscription;

  @Input() set group(value: MenuItemGroupGet) {
    this._group = value;

    if (this._group.image) {
      this.menuItemGroupImageUrl = this.restaurantService.getMultimediaUrl(this._group.image.ref)
    } else {
      this.menuItemGroupImageUrl = undefined;
    }
  }

  constructor(
    private menuCliDialogService: MenuCliDialogService,
    private restaurantService: RestaurantService,
    orderService: OrderService
  ) {
    this.orderUpdatedSubscription = orderService.orderChanged.subscribe(this.onOrderUpdate.bind(this))
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.orderUpdatedSubscription.unsubscribe();
  }

  public addGroup(group: MenuItemGroupGet) {
    this.menuCliDialogService.openAddItem(group);
  }

  public getGroupDefaultPrice(item: MenuItemGroupGet) {
    return item.menuItems[0].price;
  }

  public onOrderUpdate(order: OrderWrapper) {
    if (this._group) {
      this.orderedItefsOfType = order.items.filter(i => this._group?.menuItems.map(e => e.ref).indexOf(i.menuItem.ref) !== -1).length;
    }
    
  }
}
