import { NgModule } from '@angular/core';
import { AppStaffRoutingModule } from './app-staff-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@common/account-utils/auth-interceptor';

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
    }
  ]
})
export class AppStaffModule { }
