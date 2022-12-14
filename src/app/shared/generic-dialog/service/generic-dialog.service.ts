import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MenuItemDetailedGet, MenuItemGroupGet } from 'src/app/openapi-cli/models';
import { OrderElementDataWrapper } from '../../openapi-cli-wrapper/order/order-element-data-wrapper';
import { OrderMenuItemComponent } from '../../order-form/layout/order-menu-item/order-menu-item.component';

@Injectable({
  providedIn: 'root'
})
export class GenericDialogService {

  public static defaultGenericDialogConfig = {
    width: '100%',
    // Related to getMaxBodyHeight from generic dialog component
    height: '70%',
    maxWidth: '100%',
    position: {
      left: '0px',
      bottom: '0px'
    },
    panelClass: 'full-width-dialog'
  }

  constructor(public dialog: MatDialog) { }

  public static getDefaultGenericDialogConfig(data: any) : MatDialogConfig {
    return Object.assign({},
      GenericDialogService.defaultGenericDialogConfig,
      { data: data });
  }

  public openMenuItemComponent(
    data: {
      restaurantRef: string,
      item: OrderElementDataWrapper | undefined,
      group : MenuItemGroupGet 
    }) : MatDialogRef<OrderMenuItemComponent> {
    return this.dialog.open(OrderMenuItemComponent, GenericDialogService.getDefaultGenericDialogConfig(data));
  }
}
