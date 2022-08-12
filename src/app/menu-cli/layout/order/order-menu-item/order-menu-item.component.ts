import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { CliDialogBodyContent } from 'src/app/menu-cli/menu-cli-dialog/model/cli-dialog-body-content';
import { OrderService } from 'src/app/menu-cli/services/order/order.service';
import { OrderElementDataWrapper } from 'src/app/openapi-cli-wrapper/order/order-element-data-wrapper';
import { OrderWrapper } from 'src/app/openapi-cli-wrapper/order/order-wrapper';
import { MenuItemDetailedGet, OrderElementData, OrderPostData } from 'src/app/openapi-cli/models';
import { MenuItemControllerService } from 'src/app/openapi-cli/services';

@Component({
  selector: 'app-order-menu-item',
  templateUrl: './order-menu-item.component.html',
  styleUrls: ['./order-menu-item.component.scss']
})
export class OrderMenuItemComponent implements OnInit, CliDialogBodyContent {

  public item: MenuItemDetailedGet | undefined;
  private restaurantRef : string;
  public menuItemImageUrl: string | undefined;
  public order: OrderElementDataWrapper | undefined;

  

  constructor(
    private menuItemDetailsService: MenuItemControllerService,
    route: ActivatedRoute
  ) {
    this.restaurantRef = route.snapshot.paramMap.get('restaurantRef')!;
    
  }

  setData(data: any): void {
    if (!data.ref) {
      console.error("Item ref not found");
    } else {
      this.loadItem(data.ref);
    }
  }

  private async loadItem(ref: string) {
    this.item = await firstValueFrom(this.menuItemDetailsService.getItemDetails({
      restaurant: this.restaurantRef,
      ref: ref
    }));

    // Init order
    if (this.item !== undefined) {
      this.order = {
        menuItem: this.item,
        selects: [],
        toppings: [],
        price: this.item.price
      }
    }

    if (this.item && this.item.image) {
      this.menuItemImageUrl = "/api/multimedia/" + this.restaurantRef + "/" + this.item.image.ref;
    } else {
      this.menuItemImageUrl = undefined;
    }
  }

  ngOnInit(): void {
  }
}
