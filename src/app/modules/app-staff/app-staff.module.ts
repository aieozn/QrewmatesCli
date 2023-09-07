import { NgModule } from '@angular/core';
import { AppStaffRoutingModule } from './app-staff-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@common/account-utils/auth-interceptor';
import { RESTAURANT_MENU_DIALOG_MANAGER_TOKEN } from 'app/common/restaurant-menu/restaurant-menu.module';
import { RestaurantMenuDialogManagerMobile } from 'app/common/restaurant-menu/services/dialog-manager/restaurant-menu-dialog-manager-mobile';

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
      provide: RESTAURANT_MENU_DIALOG_MANAGER_TOKEN,
      useClass: RestaurantMenuDialogManagerMobile
    }
  ]
})
export class AppStaffModule { }
