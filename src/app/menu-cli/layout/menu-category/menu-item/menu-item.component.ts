import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuCliDialogService } from 'src/app/menu-cli/menu-cli-dialog/service/menu-cli-dialog.service';
import { OrderService } from 'src/app/menu-cli/services/order/order.service';
import { OrderWrapper } from 'src/app/openapi-cli-wrapper/order/order-wrapper';
import { MenuItemGet } from 'src/app/openapi-cli/models';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit, OnDestroy {

  _item: MenuItemGet | undefined;
  menuItemImageUrl: string | undefined = '/assets/temp/naura.jpeg';
  restaurantRef: string;

  orderedItefsOfType = 0;
  orderUpdatedSubscription: Subscription;

  @Input() set item(value: MenuItemGet) {
    this._item = value;

    if (this._item.image) {
      this.menuItemImageUrl = "/api/multimedia/" + this.restaurantRef + "/" + this._item.image.ref;
    } else {
      this.menuItemImageUrl = undefined;
    }
  }

  constructor(
    private menuCliDialogService: MenuCliDialogService,
    private orderService: OrderService,
    route: ActivatedRoute
  ) {
    this.restaurantRef = route.snapshot.paramMap.get('restaurantRef')!;
    this.orderUpdatedSubscription = orderService.orderChanged.subscribe(this.onOrderUpdate.bind(this))
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.orderUpdatedSubscription.unsubscribe();
  }

  public addItem(item: MenuItemGet) {
    this.menuCliDialogService.openAddItem(item);
  }

  public onOrderUpdate(order: OrderWrapper) {
    this.orderedItefsOfType = order.items.filter(i => i.menuItem.ref === this._item?.ref).length;
  }
}
