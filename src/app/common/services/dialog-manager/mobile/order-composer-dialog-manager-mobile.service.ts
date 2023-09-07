import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog'
import { OrderMenuItemData } from '@common/order-composer/layout/order-menu-item/order-menu-item-data';
import { OrderMenuItemComponent } from '@common/order-composer/layout/order-menu-item/order-menu-item.component';
import { OrderSummaryInputData } from '@common/order-composer/layout/order-summary/order-summary-input-data';
import { OrderSummaryComponent } from '@common/order-composer/layout/order-summary/order-summary.component';
import { OrderComposerDialogManager } from '@common/order-composer/services/order-composer-dialog-manager.service';

@Injectable()
export class OrderComposerDialogManagerMobile extends OrderComposerDialogManager {

  static defaultGenericDialogConfig = {
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

  constructor(public dialog: MatDialog) {
    super();
  }

  static getDefaultGenericDialogConfig(data: unknown) : MatDialogConfig {
    return Object.assign({},
      OrderComposerDialogManagerMobile.defaultGenericDialogConfig,
      { data: data });
  }

  openMenuItemComponent(data: OrderMenuItemData) : MatDialogRef<OrderMenuItemComponent> {
    return this.dialog.open(OrderMenuItemComponent, OrderComposerDialogManagerMobile.getDefaultGenericDialogConfig(data));
  }

  openSummary(data: OrderSummaryInputData) : MatDialogRef<OrderSummaryComponent> {
    return this.dialog.open(OrderSummaryComponent, OrderComposerDialogManagerMobile.getDefaultGenericDialogConfig(data));
  }
}
