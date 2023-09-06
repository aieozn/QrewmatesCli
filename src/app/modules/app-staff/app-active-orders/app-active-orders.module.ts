import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStaffComponent } from '../app-active-orders/layout/app-staff.component';
import { OrderComposerModule } from '@common/order-composer/order-composer.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MenuHorizontalModule } from '@common/menu-horizontal/menu-horizontal.module';
import { AccountUtilsModule } from '@common/account-utils/account-utils.module';
import { FooterPoweredByComponent } from '../app-active-orders/layout/footer-powered-by/footer-powered-by.component';
import { AppActiveOrdersRoutingModule } from './app-active-orders-routing.module';
import { PendingOrderModule } from 'app/common/pending-order/pending-order.module';
import { OrderPipeModule } from 'app/common/pipes/order-pipe/order-pipe.module';

@NgModule({
  declarations: [
    AppStaffComponent,
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
    PendingOrderModule,
    OrderPipeModule
  ],
  providers: []
})
export class AppActiveOrdersModule { }
