import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppStatisticsRoutingModule } from './app-statistics-routing.module';
import { SalesChartComponent } from './sales-chart/sales-chart.component';
import { AdminStatisticsComponent } from './admin-statistics.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    SalesChartComponent,
    AdminStatisticsComponent
  ],
  imports: [
    CommonModule,
    AppStatisticsRoutingModule,
    NgChartsModule
  ]
})
export class AppStatisticsModule { }
