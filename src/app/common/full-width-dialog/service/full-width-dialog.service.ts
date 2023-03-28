import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog'
import { OrderMenuItemData } from '../../order-composer/layout/order-menu-item/order-menu-item-data';
import { OrderMenuItemComponent } from '../../order-composer/layout/order-menu-item/order-menu-item.component';
import { ExportSummaryData } from '../../order-composer/layout/order-summary/order-summary-data';
import { OrderSummaryComponent } from '../../order-composer/layout/order-summary/order-summary.component';

@Injectable({
  providedIn: 'root'
})
export class FullWidthDialogService {

  public static defaultGenericDialogConfig = {
    width: '100%',
    // Related to getMaxBodyHeight from generic dialog component
    height: '70%',
    maxWidth: '100%',
    position: {
      left: '0px',
      bottom: '0px'
    },
    panelClass: 'full-width-dialog',
    // Use custom scroll strategy to prevent horizontal menu jumping
    scrollStrategy: {
      enable: () => { document.body.classList.add('overflow-hidden') },
      disable: () => { document.body.classList.remove('overflow-hidden') },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      attach: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      detach: () => {}
    }
  }

  constructor(public dialog: MatDialog) { }

  public static getDefaultGenericDialogConfig(data: unknown) : MatDialogConfig {
    return Object.assign({},
      FullWidthDialogService.defaultGenericDialogConfig,
      { data: data });
  }

  public openMenuItemComponent(data: OrderMenuItemData) : MatDialogRef<OrderMenuItemComponent> {
    return this.dialog.open(OrderMenuItemComponent, FullWidthDialogService.getDefaultGenericDialogConfig(data));
  }

  public openSummary(data: ExportSummaryData) : MatDialogRef<OrderSummaryComponent> {
    return this.dialog.open(OrderSummaryComponent, FullWidthDialogService.getDefaultGenericDialogConfig(data));
  }
}
