import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppTablesRoutingModule } from './app-tables-routing.module';
import { AdminTablesComponent } from './admin-tables/admin-tables.component';
import { HallModule } from 'app/common/hall/hall.module';


@NgModule({
  declarations: [
    AdminTablesComponent
  ],
  imports: [
    CommonModule,
    AppTablesRoutingModule,
    HallModule
  ]
})
export class AppTablesModule { }
