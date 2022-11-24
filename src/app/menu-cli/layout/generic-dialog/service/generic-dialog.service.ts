import { EventEmitter, Injectable, Type } from '@angular/core';
import { MenuItemGet, MenuItemGroupGet } from 'src/app/openapi-cli/models';
import { AboutUsComponent } from '../../footer/about-us/about-us.component';
import { OrderMenuItemComponent } from '../../order/order-menu-item/order-menu-item.component';
import { OrderSummaryComponent } from '../../order/order-summary/order-summary.component';
import { DialogBodyItem } from '../model/dialog-body-item';

@Injectable({
  providedIn: 'root'
})
export class MenuCliDialogService {

  public openMenuDialog = new EventEmitter<DialogBodyItem>();
  public closeMenuDialog = new EventEmitter<void>();

  constructor() { }

  public openAboutUs() {
    this.openMenuDialog.emit(new DialogBodyItem(AboutUsComponent, {}, "O nas"));
  }

  public openAddItem(group: MenuItemGroupGet) {
    this.openMenuDialog.emit(new DialogBodyItem(OrderMenuItemComponent, {group: group}, undefined));
  }

  public openSummary() {
    this.openMenuDialog.emit(new DialogBodyItem(OrderSummaryComponent, {}, "Podsumowanie zamówienia"));
  }

  public closeMenuCliDialog() {
    this.closeMenuDialog.emit();
  }
}
