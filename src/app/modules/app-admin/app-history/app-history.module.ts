import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppHistoryRoutingModule } from './app-history-routing.module';
import { AdminHistoryComponent } from './admin-history.component';


@NgModule({
  declarations: [
    AdminHistoryComponent
  ],
  imports: [
    CommonModule,
    AppHistoryRoutingModule
  ]
})
export class AppHistoryModule { }
