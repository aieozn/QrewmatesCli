import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { MenuHorizontalModule } from '@common/menu-horizontal/menu-horizontal.module';
import { RestaurantMenuModule } from 'app/common/restaurant-menu/restaurant-menu.module';
import { AppEditOrdersRoutingModule } from './app-edit-order-routing.module';
import { OrderComposerModule } from '@common/order-composer/order-composer.module';



@NgModule({
  declarations: [
    EditOrderComponent
  ],
  imports: [
    CommonModule,
    AppEditOrdersRoutingModule,
    MenuHorizontalModule,
    RestaurantMenuModule,
    OrderComposerModule
  ]
})
export class AppEditOrderModule { }
