import { Component, Inject, Input, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemGroupGet } from '@common/api-client/models';
import { OrderWrapper } from '@common/api-client/wrapper/order-wrapper';
import { Subscription, first, tap } from 'rxjs';
import { OrderService } from '../../services/order/order.service';
import { RestaurantMenuDialogManager } from '../../services/dialog-manager/restaurant-menu-dialog-manager';
import { RESTAURANT_MENU_DIALOG_MANAGER_TOKEN } from '../../restaurant-menu.module';

@Component({
  selector: 'app-menu-item-group',
  templateUrl: './menu-item-group.component.html',
  styleUrls: ['./menu-item-group.component.scss']
})
export class MenuItemGroupComponent implements OnDestroy {

  _group: MenuItemGroupGet | undefined;
  menuItemGroupImageUrl: string | undefined;

  orderedItemsOfType = 0;
  orderUpdatedSubscription: Subscription;

  @Input() set group(value: MenuItemGroupGet) {
    this._group = value;

    if (this._group.image) {
      this.menuItemGroupImageUrl = this.accountService.getMultimediaUrl(this._group.image.ref)
    } else {
      this.menuItemGroupImageUrl = undefined;
    }

    this.onOrderUpdate(this.orderService.orderChanged.getValue())
  }

  constructor(
    // private GenericDialogCliManager: GenericDialogCliManager,
    private accountService: AccountService,
    private orderService: OrderService,
    @Inject(RESTAURANT_MENU_DIALOG_MANAGER_TOKEN) private dialogManager: RestaurantMenuDialogManager
  ) {
    this.orderUpdatedSubscription = orderService.orderChanged.subscribe(this.onOrderUpdate.bind(this));
  }

  ngOnDestroy(): void {
    // this.orderUpdatedSubscription.unsubscribe();
  }

  addGroup(group: MenuItemGroupGet) {
    this.dialogManager.openAddItem(group)
    .pipe(
      first(),
      tap(data => {
        if (data) {
          this.orderService.addOrderElements(data);
        }
      })
    )
    .subscribe();
  }

  getGroupDefaultPrice(item: MenuItemGroupGet) {
    return item.menuItems[0].price;
  }

  onOrderUpdate(order: OrderWrapper | undefined) {
    if (this._group && order) {
      const countElemetns = order.activeElements.filter(i => this._group?.menuItems.map(e => e.ref).includes(i.menuItem.ref)).length;
      this.orderedItemsOfType = countElemetns;
    }
  }
}
