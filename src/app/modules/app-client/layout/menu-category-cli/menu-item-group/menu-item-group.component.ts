import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { first, Subscription } from 'rxjs';
import { GenericDialogCliManager } from "src/app/modules/app-client/services/generic-dialog-cli-manager/generic-dialog-cli-manager";
import { OrderService } from 'src/app/modules/app-client/services/order/order.service';
import { OrderWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-wrapper';
import { MenuItemGroupGet } from 'src/app/openapi-cli/models';
import { AccountService } from 'src/app/shared/account/services/account.service';

@Component({
  selector: 'app-menu-item-group',
  templateUrl: './menu-item-group.component.html',
  styleUrls: ['./menu-item-group.component.scss']
})
export class MenuItemGroupComponent implements OnInit, OnDestroy {

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

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.orderUpdatedSubscription.unsubscribe();
  }

  public addGroup(group: MenuItemGroupGet) {
    this.GenericDialogCliManager.openAddItem(group)
    .pipe(first())
    .subscribe(data => {
      if (data) {
        this.orderService.addOrderElements(data);
      }
    });
  }

  public getGroupDefaultPrice(item: MenuItemGroupGet) {
    return item.menuItems[0].price;
  }

  public onOrderUpdate(order: OrderWrapper) {
    if (this._group) {
      this.orderedItefsOfType = order.items.filter(i => this._group?.menuItems.map(e => e.ref).includes(i.menuItem.ref)).length;
    }
    
  }
}
