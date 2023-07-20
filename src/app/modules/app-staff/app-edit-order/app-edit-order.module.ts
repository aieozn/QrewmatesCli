import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { MenuHorizontalModule } from '@common/menu-horizontal/menu-horizontal.module';
import { RestaurantMenuModule } from 'app/common/restaurant-menu/restaurant-menu.module';
import { AppEditOrdersRoutingModule } from './app-edit-order-routing.module';
import { OrderComposerModule } from '@common/order-composer/order-composer.module';
import { FullWidthDialogModule } from '@common/full-width-dialog/full-width-dialog.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@common/account-utils/auth-interceptor';
import { MatIconModule } from '@angular/material/icon';
import { OrderDetailsDialogComponent } from './order-details-dialog/order-details-dialog.component';



@NgModule({
  declarations: [
    EditOrderComponent,
    OrderDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    AppEditOrdersRoutingModule,
    MenuHorizontalModule,
    RestaurantMenuModule,
    OrderComposerModule,
    FullWidthDialogModule,
    MatIconModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppEditOrderModule { }
