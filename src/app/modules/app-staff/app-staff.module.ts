import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStaffComponent } from './layout/app-staff.component';
import { OrderStatusPipe } from './layout/pipes/order-status.pipe';
import { PendingOrderComponent } from './layout/pending-order/pending-order.component';
import { DoOrderActionDialogComponent } from './layout/do-order-action-dialog/do-order-action-dialog.component';
import { OrderComposerModule } from '@common/order-composer/order-composer.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MenuHorizontalModule } from '@common/menu-horizontal/menu-horizontal.module';
import { AccountUtilsModule } from '@common/account-utils/account-utils.module';
import { AppStaffRoutingModule } from './app-staff-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@common/account-utils/auth-interceptor';
import { FooterPoweredByComponent } from './layout/footer-powered-by/footer-powered-by.component';
import { OrderAssigneePipe } from './layout/pipes/order-assignee.pipe';

@NgModule({
  declarations: [
    AppStaffComponent,
    OrderStatusPipe,
    OrderAssigneePipe,
    PendingOrderComponent,
    DoOrderActionDialogComponent,
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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppStaffModule { }
