import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog'
import { OrderMenuItemData } from '../../order-form/layout/order-menu-item/order-menu-item-data';
import { OrderMenuItemComponent } from '../../order-form/layout/order-menu-item/order-menu-item.component';
import { ExportSummaryData } from '../../order-form/layout/order-summary/order-summary-data';
import { OrderSummaryComponent } from '../../order-form/layout/order-summary/order-summary.component';

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

  public openMenuItemComponent(data: OrderMenuItemData) : MatDialogRef<OrderMenuItemComponent> {
    return this.dialog.open(OrderMenuItemComponent, GenericDialogService.getDefaultGenericDialogConfig(data));
  }

  public openSummary(data: ExportSummaryData) : MatDialogRef<OrderSummaryComponent> {
    return this.dialog.open(OrderSummaryComponent, GenericDialogService.getDefaultGenericDialogConfig(data));
  }
}
