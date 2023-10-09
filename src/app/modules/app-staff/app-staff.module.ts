import { NgModule } from '@angular/core';
import { AppStaffRoutingModule } from './app-staff-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@common/account-utils/auth-interceptor';
import { OrderComposerDialogManager } from '@common/order-composer/services/order-composer-dialog-manager.service';
import { RestaurantMenuDialogManager } from 'app/common/restaurant-menu/services/dialog-manager/restaurant-menu-dialog-manager';
import { StuffDiaglogService } from './app-active-orders/services/generic-dialog-stuff-manager/staff-dialog.service';
import { OrderComposerDialogManagerMobile } from 'app/common/services/dialog-manager/mobile/order-composer-dialog-manager-mobile.service';

@NgModule({
  declarations: [
  ],
  imports: [
    AppStaffRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: OrderComposerDialogManager,
      useClass: OrderComposerDialogManagerMobile
    },
    {
      provide: RestaurantMenuDialogManager,
      useClass: RestaurantMenuDialogManager
    },
    {
      provide: StuffDiaglogService,
      useClass: StuffDiaglogService
    }
  ]
})
export class AppStaffModule { }
