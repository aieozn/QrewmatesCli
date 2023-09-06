import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStaffComponent } from '../app-active-orders/layout/app-staff.component';
import { OrderStatusPipe } from '../app-active-orders/layout/pipes/order-status.pipe';
import { OrderComposerModule } from '@common/order-composer/order-composer.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MenuHorizontalModule } from '@common/menu-horizontal/menu-horizontal.module';
import { AccountUtilsModule } from '@common/account-utils/account-utils.module';
import { FooterPoweredByComponent } from '../app-active-orders/layout/footer-powered-by/footer-powered-by.component';
import { OrderAssigneePipe } from '../app-active-orders/layout/pipes/order-assignee.pipe';
import { OrderActivePipe } from '../app-active-orders/layout/pipes/order-active.pipe';
import { AppActiveOrdersRoutingModule } from './app-active-orders-routing.module';
import { PendingOrderModule } from 'app/common/pending-order/pending-order.module';



@NgModule({
  declarations: [
    AppStaffComponent,
    OrderStatusPipe,
    OrderActivePipe,
    OrderAssigneePipe,
    FooterPoweredByComponent
  ],
  imports: [
    AppActiveOrdersRoutingModule,
    MatIconModule,
    CommonModule,
    OrderComposerModule,
    MatInputModule,
    MenuHorizontalModule,
    AccountUtilsModule,
    PendingOrderModule
  ],
  providers: []
})
export class AppActiveOrdersModule { }
