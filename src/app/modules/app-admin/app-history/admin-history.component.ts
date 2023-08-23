import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from '@common/account-utils/services/account.service';
import { OrdersListElement } from '@common/api-client/models';
import { OrderInstanceControllerService } from '@common/api-client/services';
import { DateRangePickerComponent } from 'app/common/components/date-range-picker/date-range-picker/date-range-picker.component';
import { EnumPickerData } from 'app/common/components/enum-picker/enum-picker/enum-picker-data';
import { EnumPickerComponent } from 'app/common/components/enum-picker/enum-picker/enum-picker.component';
import { OrderStatus, Translators } from 'app/common/translators';
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
  selectedStatuses: OrderStatus[] | undefined;

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

  selectOrderStatus() {
    const allElements : OrderStatus[] = ['PLACED',  'EXPIRED', 'ABANDONED', 'REJECTED', 'ACCEPTED', 'CANCELED', 'SERVED'];
    
    const data: EnumPickerData = {
      elements: allElements.map(e => ({
        value: e,
        translation: Translators.translateOrderStatus(e)
      }))
    }
    
    this.dialogService.open(EnumPickerComponent, {data}).afterClosed().pipe(
      map(e => e as OrderStatus[] | undefined),
      tap(e => this.setStatuses(e))
    ).subscribe();
  }

  clearDateRange() {
    this.dateRange = undefined;
    this.loadData(1);
  }

  clearStatuses() {
    this.setStatuses(undefined);
  }

  setDateRange(start: Date, end: Date) {
    this.dateRange = {
      start: start,
      end: end
    }

    this.loadData(1);
  }

  setStatuses(statuses: OrderStatus[] | undefined) {
    if (!statuses || statuses.length == 0) {
      this.selectedStatuses = undefined;
    } else {
      this.selectedStatuses = statuses;
    }
    
    this.loadData(1);
  }

  ngAfterViewInit(): void {
    this.loadData(1);
    // this.dataSource.paginator = this.paginator!;
  }

  changeSort(event: Sort) {
    this.activeSort = event;
    this.loadData(1);
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

  getPage(pageSize: number, page: number, sort: Sort) {
    this.pageSize = pageSize;
    this.activeSort = sort;

    this.loadData(page);
  }

  getSelectedStatusesString(elements: OrderStatus[]) {
    return elements.map(e => this.translator.translateOrderStatus(e)).join(", ")
  }

  loadData(page: number) {
    this.orderService.getOrders({
      restaurantRef: this.accountService.getRestaurantRef(),
      listOrderParams: {
        orderBy: this.activeSort.direction ? this.getColumnTypeName(this.activeSort.active) : 'CREATED',
        orderDirection: this.activeSort.direction ? this.getSortDirectionTypeName(this.activeSort.direction) : 'ASC',
        page: page,
        pageSize: this.pageSize,
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
