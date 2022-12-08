import { Injectable } from '@angular/core';
import { MenuItemGroupGet } from 'src/app/openapi-cli/models';
import { AboutUsComponent } from '../../layout/footer/about-us/about-us.component';
import { DialogBodyItem } from '../../../shared/generic-dialog/model/dialog-body-item';
import { GenericDialogService } from 'src/app/shared/generic-dialog/service/generic-dialog.service';
import { OrderSummaryComponent } from 'src/app/shared/order-form/layout/order-summary/order-summary.component';
import { RestaurantService } from '../restaurant/restaurant.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderElementDataWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-element-data-wrapper';
import { OrderService } from '../order/order.service';


@Injectable({
  providedIn: 'root'
})
export class GenericDialogCliManager {

  constructor(private dialogService: GenericDialogService, private restaurantService: RestaurantService,
    private dialog: MatDialog, private orderService: OrderService) { }

  public openAboutUs() {
    // TODO fix AboutUsComponent title
    this.dialog.open(AboutUsComponent, GenericDialogService.getDefaultGenericDialogConfig({}))
  }

  public openAddItem(group: MenuItemGroupGet) {
    // this.dialogService.openMenuDialog.emit(new DialogBodyItem(OrderMenuItemComponent, 
    //   { group: group, restaurantRef: this.restaurantService.getRestaurantRef() }, undefined));

    this.dialogService.openMenuItemComponent({
      group: group,
      restaurantRef: this.restaurantService.getRestaurantRef()
    }).afterClosed().subscribe((data: OrderElementDataWrapper[] | undefined) => {
      if (data) {
        this.orderService.addOrderElements(data);
      }
    })
  }

  public openSummary() {
    // TODO fix title
    this.dialog.open(OrderSummaryComponent, GenericDialogService.getDefaultGenericDialogConfig({}))
  }
}
