import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppStatisticsRoutingModule } from './app-statistics-routing.module';
import { SalesChartComponent } from './sales-chart/sales-chart.component';
import { AdminStatisticsComponent } from './admin-statistics.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/common/account-utils/auth-interceptor';


@NgModule({
  declarations: [
    SalesChartComponent,
    AdminStatisticsComponent
  ],
  imports: [
    CommonModule,
    AppStatisticsRoutingModule
  ]
})
export class AppStatisticsModule { }
