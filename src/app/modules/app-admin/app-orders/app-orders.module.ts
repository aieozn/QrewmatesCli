import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppOrdersRoutingModule } from './app-orders-routing.module';
import { AdminOrdersComponent } from './admin-orders.component';


@NgModule({
  declarations: [
    AdminOrdersComponent
  ],
  imports: [
    CommonModule,
    AppOrdersRoutingModule
  ]
})
export class AppOrdersModule { }
