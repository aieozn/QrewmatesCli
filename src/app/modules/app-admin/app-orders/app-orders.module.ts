import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppOrdersRoutingModule } from './app-orders-routing.module';
import { AdminOrdersComponent } from './admin-orders.component';
import { MenuHorizontalModule } from '@common/menu-horizontal/menu-horizontal.module';
import { PendingOrderModule } from 'app/common/pending-order/pending-order.module';
import { OrderPipeModule } from 'app/common/pipes/order-pipe/order-pipe.module';
import { ComplexEditorModule } from 'app/common/complex-editor/complex-editor.module';
import { OrderDetailsDialogComponent } from './order-details-dialog/order-details-dialog.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { RestaurantMenuModule } from 'app/common/restaurant-menu/restaurant-menu.module';
import { MatIconModule } from '@angular/material/icon';
import { OrderComposerModule } from '@common/order-composer/order-composer.module';
import { OrderComposerDialogManager } from '@common/order-composer/services/order-composer-dialog-manager.service';
import { OrderComposerDialogManagerDesktop } from 'app/common/services/dialog-manager/desktop/order-composer-dialog-manager-desktop.service';
import { RestaurantMenuDialogManager } from 'app/common/restaurant-menu/services/dialog-manager/restaurant-menu-dialog-manager';


@NgModule({
  declarations: [
    AdminOrdersComponent,
    OrderDetailsDialogComponent,
    EditOrderComponent
  ],
  imports: [
    CommonModule,
    AppOrdersRoutingModule,
    MenuHorizontalModule,
    PendingOrderModule,
    OrderPipeModule,
    ComplexEditorModule,
    OrderComposerModule,
    MatIconModule,
    RestaurantMenuModule
  ],
  providers: [
    {
      provide: OrderComposerDialogManager,
      useClass: OrderComposerDialogManagerDesktop
    },
    {
      provide: RestaurantMenuDialogManager,
      useClass: RestaurantMenuDialogManager
    }
  ]
})
export class AppOrdersModule { }
