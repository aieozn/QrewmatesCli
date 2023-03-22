import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStaffComponent } from './layout/app-staff.component';
import { OrderStatusPipe } from './layout/pipes/order-status.pipe';
import { PendingOrderComponent } from './layout/pending-order/pending-order.component';
import { DoOrderActionDialogComponent } from './layout/do-order-action-dialog/do-order-action-dialog.component';
import { AccountBarComponent } from './layout/account-bar/account-bar.component';
import { OrderComposerModule } from 'src/app/common/order-composer/order-composer.module';
import { MatIconModule } from '@angular/material/icon';
import { FooterPoweredByComponent } from './layout/footer-powered-by/footer-powered-by.component';
import { MatInputModule } from '@angular/material/input';
import { MenuHorizontalModule } from 'src/app/common/menu-horizontal/menu-horizontal.module';
import { AccountUtilsModule } from 'src/app/common/account-utils/account-utils.module';
import { AppStaffRoutingModule } from './app-staff-routing.module';

@NgModule({
  declarations: [
    AppStaffComponent,
    OrderStatusPipe,
    PendingOrderComponent,
    DoOrderActionDialogComponent,
    AccountBarComponent,
    FooterPoweredByComponent
  ],
  imports: [
    AppStaffRoutingModule,
    MatIconModule,
    CommonModule,
    OrderComposerModule,
    MatInputModule,
    MenuHorizontalModule,
    AccountUtilsModule
  ]
})
export class AppStaffModule { }
