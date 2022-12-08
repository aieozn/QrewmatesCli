import { Injectable } from '@angular/core';
import { MenuItemGroupGet } from 'src/app/openapi-cli/models';
import { AboutUsComponent } from '../../layout/footer/about-us/about-us.component';
import { DialogBodyItem } from '../../../shared/generic-dialog/model/dialog-body-item';
import { GenericDialogService } from 'src/app/shared/generic-dialog/service/generic-dialog.service';
import { OrderMenuItemComponent } from 'src/app/shared/order-form/layout/order-menu-item/order-menu-item.component';
import { OrderSummaryComponent } from 'src/app/shared/order-form/layout/order-summary/order-summary.component';
import { RestaurantService } from '../restaurant/restaurant.service';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class GenericDialogCliManager {

  constructor(private dialogService: GenericDialogService,
    private restaurantService: RestaurantService,
    public dialog: MatDialog) { }

  public openAboutUs() {
    this.dialogService.openMenuDialog.emit(new DialogBodyItem(AboutUsComponent, {}, "O nas"));
  }

  public openAddItem(group: MenuItemGroupGet) {
    // this.dialogService.openMenuDialog.emit(new DialogBodyItem(OrderMenuItemComponent, 
    //   { group: group, restaurantRef: this.restaurantService.getRestaurantRef() }, undefined));

    this.dialog.open(OrderMenuItemComponent, 
      { 
        data: {
          group: group,
          restaurantRef: this.restaurantService.getRestaurantRef()
        },
        width: '100%',
        height: '70%',
        maxWidth: '100%',
        position: {
          left: '0px',
          bottom: '0px'
        },
        panelClass: 'full-width-dialog'
      })
  }

  public openSummary() {
    this.dialogService.openMenuDialog.emit(new DialogBodyItem(OrderSummaryComponent, {}, "Podsumowanie zamówienia"));
  }

  public closeMenuCliDialog() {
    this.dialogService.closeMenuCliDialog();
  }
}
