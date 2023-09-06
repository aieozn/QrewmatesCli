import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppOrdersRoutingModule } from './app-orders-routing.module';
import { AdminOrdersComponent } from './admin-orders.component';
import { MenuHorizontalModule } from '@common/menu-horizontal/menu-horizontal.module';
import { PendingOrderModule } from 'app/common/pending-order/pending-order.module';
import { OrderPipeModule } from 'app/common/pipes/order-pipe/order-pipe.module';
import { ComplexEditorModule } from 'app/common/complex-editor/complex-editor.module';
import { OrderDetailsDialogComponent } from './order-details-dialog/order-details-dialog.component';
import { OrderComposerModule } from '@common/order-composer/order-composer.module';


@NgModule({
  declarations: [
    AdminOrdersComponent,
    OrderDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    AppOrdersRoutingModule,
    MenuHorizontalModule,
    PendingOrderModule,
    OrderPipeModule,
    ComplexEditorModule,
    OrderComposerModule
  ]
})
export class AppOrdersModule { }
