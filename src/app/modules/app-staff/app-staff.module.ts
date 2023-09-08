import { NgModule } from '@angular/core';
import { AppStaffRoutingModule } from './app-staff-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@common/account-utils/auth-interceptor';
import { OrderComposerDialogManagerMobile } from 'app/common/services/dialog-manager/mobile/order-composer-dialog-manager-mobile.service';
import { ORDER_COMPOSER_DIALOG_MANAGER_TOKEN } from '@common/order-composer/OrderComposerDialogManagerToken';

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
      provide: ORDER_COMPOSER_DIALOG_MANAGER_TOKEN,
      useClass: OrderComposerDialogManagerMobile
    }
  ]
})
export class AppStaffModule { }
