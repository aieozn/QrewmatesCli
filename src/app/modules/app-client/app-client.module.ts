import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppClientRoutingModule } from './app-client-routing.module';
import { AppClientComponent } from './layout/app-client.component';
import { MatIconModule } from '@angular/material/icon';
import { WaitForOrderDialogComponent } from './layout/wait-for-order-dialog/wait-for-order-dialog.component';
import { FooterAboutUsComponent } from './layout/footer/footer-about-us/footer-about-us.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FullWidthDialogModule } from '@common/full-width-dialog/full-width-dialog.module';
import { OrderComposerModule } from '@common/order-composer/order-composer.module';
import { FooterPoweredByComponent } from './layout/footer/footer-powered-by/footer-powered-by.component';
import { MenuHorizontalModule } from '@common/menu-horizontal/menu-horizontal.module';
import { CookieService } from 'ngx-cookie-service';
import { ApiModule } from '@common/api-client/api.module';
import { RESTAURANT_MENU_DIALOG_MANAGER_TOKEN, RestaurantMenuModule } from 'app/common/restaurant-menu/restaurant-menu.module';
import { RestaurantMenuDialogManagerMobile } from 'app/common/restaurant-menu/services/dialog-manager/restaurant-menu-dialog-manager-mobile';


@NgModule({
  declarations: [
    FooterAboutUsComponent,
    WaitForOrderDialogComponent,
    AppClientComponent,
    WaitForOrderDialogComponent,
    FooterPoweredByComponent
  ],
  imports: [
    CommonModule,
    AppClientRoutingModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FullWidthDialogModule,
    OrderComposerModule,
    MenuHorizontalModule,
    ApiModule,
    RestaurantMenuModule
  ],
  providers: [
    CookieService,
    { 
      provide: RESTAURANT_MENU_DIALOG_MANAGER_TOKEN,
      useClass: RestaurantMenuDialogManagerMobile
    }
  ]
})
export class AppClientModule { }
