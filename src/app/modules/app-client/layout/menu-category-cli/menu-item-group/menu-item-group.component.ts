import { Component, Input, OnDestroy } from '@angular/core';
import { first, Subscription } from 'rxjs';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemGroupGet } from '@common/api-client/models';
import { OrderWrapper } from '@common/api-client/wrapper/order-wrapper';
import { GenericDialogCliManager } from "../../../services/generic-dialog-cli-manager/generic-dialog-cli-manager";
import { OrderService } from '../../../services/order/order.service';

@Component({
  selector: 'app-menu-item-group',
  templateUrl: './menu-item-group.component.html',
  styleUrls: ['./menu-item-group.component.scss']
})
export class MenuItemGroupComponent implements OnDestroy {

  _group: MenuItemGroupGet | undefined;
  menuItemGroupImageUrl: string | undefined;

  orderedItefsOfType = 0;
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
    private GenericDialogCliManager: GenericDialogCliManager,
    private accountService: AccountService,
    private orderService: OrderService
  ) {
    this.orderUpdatedSubscription = orderService.orderChanged.subscribe(this.onOrderUpdate.bind(this));
  }

  ngOnDestroy(): void {
    this.orderUpdatedSubscription.unsubscribe();
  }

  addGroup(group: MenuItemGroupGet) {
    this.GenericDialogCliManager.openAddItem(group)
    .pipe(first())
    .subscribe(data => {
      if (data) {
        this.orderService.addOrderElements(data);
      }
    });
  }

  getGroupDefaultPrice(item: MenuItemGroupGet) {
    return item.menuItems[0].price;
  }

  onOrderUpdate(order: OrderWrapper) {
    if (this._group) {
      this.orderedItefsOfType = order.items.filter(i => this._group?.menuItems.map(e => e.ref).includes(i.menuItem.ref)).length;
    }
    
  }
}
