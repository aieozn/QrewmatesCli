import { EventEmitter, Injectable, Type } from '@angular/core';
import { MenuItemGet } from 'src/app/openapi-cli/models';
import { AboutUsComponent } from '../../layout/footer/about-us/about-us.component';
import { OrderMenuItemComponent } from '../../layout/order/order-menu-item/order-menu-item.component';
import { OrderSummaryComponent } from '../../layout/order/order-summary/order-summary.component';
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

  public openAddItem(item: MenuItemGet) {
    this.openMenuDialog.emit(new DialogBodyItem(OrderMenuItemComponent, {ref: item.ref!}, undefined));
  }

  public openSummary() {
    this.openMenuDialog.emit(new DialogBodyItem(OrderSummaryComponent, {}, "Podsumowanie zamówienia"));
  }

  public closeMenuCliDialog() {
    this.closeMenuDialog.emit();
  }
}
