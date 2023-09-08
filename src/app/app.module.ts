import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './common/account-utils/auth-interceptor';
import { MatNativeDateModule } from '@angular/material/core';
import { ORDER_COMPOSER_DIALOG_MANAGER_TOKEN } from '@common/order-composer/OrderComposerDialogManagerToken';
import { OrderComposerDialogManagerMobile } from './common/services/dialog-manager/mobile/order-composer-dialog-manager-mobile.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // Required for some reason?
    MatSelectModule,
    // Required for some reason?
    MatDialogModule,
    // Required for admin history date filte
    MatNativeDateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: ORDER_COMPOSER_DIALOG_MANAGER_TOKEN, useClass: OrderComposerDialogManagerMobile }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
