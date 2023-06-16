import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppTablesRoutingModule } from './app-tables-routing.module';
import { AdminTablesComponent } from './admin-tables/admin-tables.component';


@NgModule({
  declarations: [
    AdminTablesComponent
  ],
  imports: [
    CommonModule,
    AppTablesRoutingModule
  ]
})
export class AppTablesModule { }
