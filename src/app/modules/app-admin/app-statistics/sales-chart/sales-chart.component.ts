import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart } from "chart.js";
import { BehaviorSubject, first, Subject, takeUntil } from 'rxjs';
import { CalendarUtils } from 'src/app/menu-admin/utils/calendar-utils';
import { StatisticsHourlySalesGet } from 'src/app/openapi-cli/models';
import { StatisticsControllerService } from 'src/app/openapi-cli/services';
import { AccountService } from 'src/app/shared/account/services/account.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales-chart.component.html',
  styleUrls: ['./sales-chart.component.scss']
})
export class SalesChartComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('chart')
  private chartRef: ElementRef | undefined;
  private chart: Chart | undefined;
  public chartDescription: string | undefined;
  public summary: {
    ordersCount: number,
    ordersValue: number,
    orderAverageValue: number
  } | undefined;
  
  public lineChartLegend = true;
  private chartLoadedSubject = new BehaviorSubject(undefined);
  private readonly onDestroy = new Subject<void>();

  constructor(private statisticsService: StatisticsControllerService, private accountService: AccountService) {

    let now = new Date();
    let dataYear = now.getFullYear();
    let dataMonth = now.getMonth() + 1;

    this.loadMonthData(dataYear, dataMonth);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  ngAfterViewInit(): void {
    this.chartLoadedSubject.next(undefined);
  }

  private loadChart(chartDescription: string, data: number[], labels: string[], summary: {
    ordersCount: number,
    ordersValue: number,
    orderAverageValue: number
  }) {
    this.chartDescription = chartDescription;
    this.summary = summary;
    let chartData = {
      datasets: [{
        data: data,
        fill: false,
        backgroundColor: '#38A583'
      }],
      labels: labels
    };

    let chartOptions = {
      responsive: false,
      scales: {
        y: {
          min: 0,
          ticks: {
            precision: 0
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    };

    if (this.chart === undefined) {
      this.chart = new Chart(this.chartRef!.nativeElement, {
        type: 'bar',
        data: chartData,
        options: chartOptions
      });
    } else {
      this.chart.config.data = chartData;
      this.chart.config.options = chartOptions;
      this.chart.update();
    }
    
  }

  ngOnInit(): void {
    
  }

  public changeRange(range: any) {
    let now = new Date();
    let dataYear = now.getFullYear();
    let dataMonth = now.getMonth() + 1;

    if (range.value) {
      switch (range.value) {
        case 'year':
          this.loadYearData(dataYear - 1);
          break;
        case 'month':
          this.loadMonthData(dataYear, dataMonth);
          break;
        case 'week':
          this.loadWeekData();
          break;
        case 'day':
          this.loadDayData();
          break;
        default:
          throw 'Invalid date range: ' + range;
      }
    }
  }

  private loadYearData(year: number) {
    let end : Date = new Date();

    this.statisticsService.getYearSales({
      restaurantRef: this.accountService.getRestaurantRef(),
      'params': {
        yearStart: year,
        monthStart: 1,
        yearEnd: year,
        monthEnd: 12
      }
    }).subscribe(chartData => {
      this.chartLoadedSubject
        .pipe(takeUntil(this.onDestroy))
        .subscribe(_ => {
          let ordersCount = chartData.map(e => e.orderCount).reduce((accumulator, current) => accumulator + current);
          let ordersValue = chartData.map(e => e.ordersValue).reduce((accumulator, current) => accumulator + current);
          this.loadChart(
            'Liczba obsłużonych zamówień w roku ' + year,
            chartData.map(e => e.orderCount),
            chartData.map(e => CalendarUtils.monthNumberToName(e.orderMonth)),
            {
              ordersCount: ordersCount,
              ordersValue: ordersValue,
              orderAverageValue: ordersCount > 0 ? ordersValue / ordersCount : 0
            }
          );
        });
    });
  }

  private loadMonthData(year: number, month: number) {
    this.statisticsService.getDailySales({
      restaurantRef: this.accountService.getRestaurantRef(),
      'params': {
        yearStart: year,
        monthStart: month,
        dayOfMonthStart: 1,
        yearEnd: year,
        monthEnd: month,
        // Somehow this returns number of days in month
        dayOfMonthEnd: new Date(year, month, 0).getDate()
      }
    }).subscribe(chartData => {
      this.chartLoadedSubject
        .pipe(first(), takeUntil(this.onDestroy))
        .subscribe(_ => {
          let ordersCount = chartData.map(e => e.orderCount).reduce((accumulator, current) => accumulator + current);
          let ordersValue = chartData.map(e => e.ordersValue).reduce((accumulator, current) => accumulator + current);
          this.loadChart(
            $localize`The number of orders served in ` + CalendarUtils.monthNumberToLocative(month),
            chartData.map(e => e.orderCount),
            chartData.map(e => String(e.orderMonth).padStart(2, '0') + '/' + String(e.orderDay).padStart(2, '0')),
            {
              ordersCount: ordersCount,
              ordersValue: ordersValue,
              orderAverageValue: ordersCount > 0 ? ordersValue / ordersCount : 0
            }
          );
        });
    });
  }

  private loadWeekData() {
    let end : Date = new Date();
    let start = new Date();
    start.setDate(end.getDate() - 6);

    this.statisticsService.getDailySales({
      restaurantRef: this.accountService.getRestaurantRef(),
      'params': {
        yearStart: start.getFullYear(),
        monthStart: start.getMonth() + 1,
        dayOfMonthStart: start.getDate(),
        yearEnd: end.getFullYear(),
        monthEnd: end.getMonth() + 1,
        // Somehow this returns number of days in month
        dayOfMonthEnd: end.getDate()
      }
    }).subscribe(chartData => {
      this.chartLoadedSubject
        .pipe(first(), takeUntil(this.onDestroy))
        .subscribe(_ => {
          let ordersCount = chartData.map(e => e.orderCount).reduce((accumulator, current) => accumulator + current);
          let ordersValue = chartData.map(e => e.ordersValue).reduce((accumulator, current) => accumulator + current);
          this.loadChart(
            $localize`The number of orders served in the last week`,
            chartData.map(e => e.orderCount),
            chartData.map(e => String(e.orderMonth).padStart(2, '0') + '/' + String(e.orderDay).padStart(2, '0')),
            {
              ordersCount: ordersCount,
              ordersValue: ordersValue,
              orderAverageValue: ordersCount > 0 ? ordersValue / ordersCount : 0
            }
          );
        });
    });
  }

  private loadDayData() {
    let end : Date = new Date();

    this.statisticsService.getHourlySales({
      restaurantRef: this.accountService.getRestaurantRef(),
      'params': {
        yearStart: end.getFullYear(),
        monthStart: end.getMonth() + 1,
        dayOfMonthStart: end.getDate(),
        hourStart: 0,
        yearEnd: end.getFullYear(),
        monthEnd: end.getMonth() + 1,
        // Somehow this returns number of days in month
        dayOfMonthEnd: end.getDate(),
        hourEnd: 23
      }
    }).subscribe(chartData => {
      this.chartLoadedSubject
        .pipe(first(), takeUntil(this.onDestroy))
        .subscribe(_ => {
          let ordersCount = chartData.map(e => e.orderCount).reduce((accumulator, current) => accumulator + current);
          let ordersValue = chartData.map(e => e.ordersValue).reduce((accumulator, current) => accumulator + current);
          
          this.loadChart(
            $localize`The number of orders served today`,
            chartData.map(e => e.orderCount),
            chartData.map(e => this.formatHourlyLabel(e)),
            {
              ordersCount: ordersCount,
              ordersValue: ordersValue,
              orderAverageValue: ordersCount > 0 ? ordersValue / ordersCount : 0
            }
          );
        });
    });
  }

  private formatHourlyLabel(value: StatisticsHourlySalesGet) : string {
    let hourString = String(value.orderHour).padStart(2, '0') + ':00';

    return hourString;
  }
}
