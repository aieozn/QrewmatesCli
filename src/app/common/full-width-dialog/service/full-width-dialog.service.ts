import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog'
import { OrderMenuItemData } from '../../order-composer/layout/order-menu-item/order-menu-item-data';
import { OrderMenuItemComponent } from '../../order-composer/layout/order-menu-item/order-menu-item.component';
import { OrderSummaryComponent } from '../../order-composer/layout/order-summary/order-summary.component';
import { OrderSummaryInputData } from '@common/order-composer/layout/order-summary/order-summary-input-data';

@Injectable({
  providedIn: 'root'
})
export class FullWidthDialogService {

  static defaultMobileGenericDialogConfig = {
    width: '100%',
    // Related to getMaxBodyHeight from generic dialog component
    height: '70%',
    maxWidth: '1000px',
    position: {
      left: 'auto',
      right: 'auto',
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

  static defaultDesktopGenericDialogConfig = {
    width: 'calc(100% - 300px)',
    // Related to getMaxBodyHeight from generic dialog component
    height: '70%',
    position: {
      left: '300px',
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

  static getDefaultMobileGenericDialogConfig(data: unknown) : MatDialogConfig {
    return Object.assign({},
      FullWidthDialogService.defaultMobileGenericDialogConfig,
      { data: data });
  }

  static getDefaultDesktopGenericDialogConfig(data: unknown) : MatDialogConfig {
    return Object.assign({},
      FullWidthDialogService.defaultDesktopGenericDialogConfig,
      { data: data });
  }

  openMenuItemComponentMobile(data: OrderMenuItemData) : MatDialogRef<OrderMenuItemComponent> {
    return this.dialog.open(OrderMenuItemComponent, FullWidthDialogService.getDefaultMobileGenericDialogConfig(data));
  }

  openMenuItemComponentDesktop(data: OrderMenuItemData) : MatDialogRef<OrderMenuItemComponent> {
    return this.dialog.open(OrderMenuItemComponent, FullWidthDialogService.getDefaultDesktopGenericDialogConfig(data));
  }
  

  openSummary(data: OrderSummaryInputData) : MatDialogRef<OrderSummaryComponent> {
    return this.dialog.open(OrderSummaryComponent, FullWidthDialogService.getDefaultMobileGenericDialogConfig(data));
  }
}
