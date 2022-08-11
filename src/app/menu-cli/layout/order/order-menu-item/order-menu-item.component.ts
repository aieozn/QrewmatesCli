import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CliDialogBodyContent } from 'src/app/menu-cli/menu-cli-dialog/model/cli-dialog-body-content';
import { MenuItemDetailedGet, OrderElementData, OrderPostData } from 'src/app/openapi-cli/models';
import { MenuItemControllerService } from 'src/app/openapi-cli/services';

@Component({
  selector: 'app-order-menu-item',
  templateUrl: './order-menu-item.component.html',
  styleUrls: ['./order-menu-item.component.scss']
})
export class OrderMenuItemComponent implements OnInit, CliDialogBodyContent {

  private ref: string | undefined;
  public item: MenuItemDetailedGet | undefined;
  private restaurantRef : string;
  public menuItemImageUrl: string | undefined;
  public order: OrderElementData | undefined;

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


      this.order = {
        menuItem: {
          ref: data.ref
        },
        selects: [],
        toppings: []
      }
    }
  }

  private async loadItem(ref: string) {
    this.item = await firstValueFrom(this.menuItemDetailsService.getItemDetails({
      restaurant: this.restaurantRef,
      ref: ref
    }));

    if (this.item && this.item.image) {
      this.menuItemImageUrl = "/api/multimedia/" + this.restaurantRef + "/" + this.item.image.ref;
    } else {
      this.menuItemImageUrl = undefined;
    }
  }

  ngOnInit(): void {
  }

}
