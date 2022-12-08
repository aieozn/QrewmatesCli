import { EventEmitter, Injectable } from '@angular/core';
import { MenuItemGroupGet } from 'src/app/openapi-cli/models';
import { AboutUsComponent } from '../../layout/footer/about-us/about-us.component';
import { OrderMenuItemComponent } from '../../layout/order/order-menu-item/order-menu-item.component';
import { OrderSummaryComponent } from '../../layout/order/order-summary/order-summary.component';
import { DialogBodyItem } from '../../../shared/generic-dialog/model/dialog-body-item';
import { GenericDialogComponent } from 'src/app/shared/generic-dialog/layout/generic-dialog/generic-dialog.component';
import { GenericDialogService } from 'src/app/shared/generic-dialog/service/generic-dialog.service';


@Injectable({
  providedIn: 'root'
})
export class GenericDialogCliManager {

  constructor(private dialogService: GenericDialogService) { }

  public openAboutUs() {
    this.dialogService.openMenuDialog.emit(new DialogBodyItem(AboutUsComponent, {}, "O nas"));
  }

  public openAddItem(group: MenuItemGroupGet) {
    this.dialogService.openMenuDialog.emit(new DialogBodyItem(OrderMenuItemComponent, { group: group }, undefined));
  }

  public openSummary() {
    this.dialogService.openMenuDialog.emit(new DialogBodyItem(OrderSummaryComponent, {}, "Podsumowanie zamówienia"));
  }

  public closeMenuCliDialog() {
    this.dialogService.closeMenuDialog.emit();
  }
}
