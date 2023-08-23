import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from '@common/account-utils/services/account.service';
import { OrdersListElement } from '@common/api-client/models';
import { OrderInstanceControllerService } from '@common/api-client/services';
import { DateRangePickerComponent } from 'app/common/components/date-range-picker/picker/date-range-picker.component';
import { Translators } from 'app/common/translators';
import { filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['./admin-history.component.scss']
})
export class AdminHistoryComponent implements AfterViewInit  {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined

  protected translator = Translators

  pageSize = 20;
  dateRange: {
    start: Date,
    end: Date
  } | undefined;

  dataSource = new MatTableDataSource<OrdersListElement>([]);
  displayedColumns = [
    "ref",
    "created",
    "orderStatus",
    "paymentStatus",
    "paymentMethod",
    "actions",
  ]

  activeSort: Sort = {
    active: 'created',
    direction: ''
  }

  constructor(
    private orderService: OrderInstanceControllerService,
    private accountService: AccountService,
    private dialogService: MatDialog
  ) {

  }

  selectDateRange() {
    this.dialogService.open(DateRangePickerComponent).afterClosed().pipe(
      filter(e => e != undefined),
      map(e => e as DateRange<Date | Date>),
      tap(e => this.setDateRange(e.start!, e.end!))
    ).subscribe();

    return false;
  }

  clearDateRange() {
    this.dateRange = undefined;
    this.loadData(this.pageSize, 1, this.activeSort);
  }

  setDateRange(start: Date, end: Date) {
    this.dateRange = {
      start: start,
      end: end
    }

    this.loadData(this.pageSize, 1, this.activeSort);
  }

  ngAfterViewInit(): void {
    this.loadData(this.pageSize, 1, this.activeSort);
    // this.dataSource.paginator = this.paginator!;
  }

  changeSort(event: Sort) {
    this.activeSort = event;
    this.loadData(this.pageSize, 1, this.activeSort);
  }

  getColumnTypeName(name: string) : 'CREATED' | 'ORDER_STATUS' | 'PAYMENT_STATUS' | 'PAYMENT_METHOD' {
    switch(name) {
      case "created": return "CREATED";
      case "orderStatus": return "ORDER_STATUS";
      case "paymentStatus": return "PAYMENT_STATUS";
      case "paymentMethod": return "PAYMENT_METHOD";
      default: throw 'Unknown column';
    }
  }

  getSortDirectionTypeName(name: string) : 'ASC' | 'DESC' {
    switch(name) {
      case "asc": return "ASC";
      case "desc": return "DESC";
      default: throw 'Unknown sort direction';
    }
  }

  loadData(pageSize: number, page: number, sort: Sort) {
    this.orderService.getOrders({
      restaurantRef: this.accountService.getRestaurantRef(),
      listOrderParams: {
        orderBy: sort.direction ? this.getColumnTypeName(sort.active) : 'CREATED',
        orderDirection: sort.direction ? this.getSortDirectionTypeName(sort.direction) : 'ASC',
        page: page,
        pageSize: pageSize,
        createdDateFrom: this.dateRange ? this.dateRange.start.toISOString().split('T')[0] : undefined,
        createdDateTo: this.dateRange ? this.dateRange.end.toISOString().split('T')[0] : undefined,
      }
    }).pipe(
      tap(e => {
        this.dataSource.data = e.elements
        this.paginator!.length = e.totalElements
        this.paginator!.pageIndex = e.page - 1
      })
    ).subscribe();
  }
}
