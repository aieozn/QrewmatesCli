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
import { OrderStatus, PaymentMethod, PaymentStatus, Translators } from 'app/common/translators';
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
  selectedOrderStatus: OrderStatus[] | undefined;
  selectedPaymentStatus: PaymentStatus[] | undefined;
  selectedPaymentMethod: PaymentMethod[] | undefined;

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
      tap(e => this.setOrderStatusFilter(e))
    ).subscribe();
  }

  selectPaymentStatus() {
    const allElements : PaymentStatus[] = ['UNPAID', 'PAID', 'RETURNED', 'WITHDRAWN'];
    
    const data: EnumPickerData = {
      elements: allElements.map(e => ({
        value: e,
        translation: Translators.translatePaymentStatus(e)
      }))
    }
    
    this.dialogService.open(EnumPickerComponent, {data}).afterClosed().pipe(
      map(e => e as PaymentStatus[] | undefined),
      tap(e => this.setPaymentStatusFilter(e))
    ).subscribe();
  }

  selectPaymentMethod() {
    const allElements : PaymentMethod[] = ['CASH', 'BLIK'];
    
    const data: EnumPickerData = {
      elements: allElements.map(e => ({
        value: e,
        translation: Translators.translatePaymentMethod(e)
      }))
    }
    
    this.dialogService.open(EnumPickerComponent, {data}).afterClosed().pipe(
      map(e => e as PaymentMethod[] | undefined),
      tap(e => this.setPaymentMethodFilter(e))
    ).subscribe();
  }

  clearDateRange() {
    this.dateRange = undefined;
    this.loadData(1);
  }

  clearOrderStatus() {
    this.setOrderStatusFilter(undefined);
  }

  clearPaymentMethod() {
    this.setPaymentMethodFilter(undefined);
  }

  clearPaymentStatus() {
    this.setPaymentStatusFilter(undefined);
  }

  setDateRange(start: Date, end: Date) {
    this.dateRange = {
      start: start,
      end: end
    }

    this.loadData(1);
  }

  setOrderStatusFilter(statuses: OrderStatus[] | undefined) {
    if (!statuses || statuses.length == 0) {
      this.selectedOrderStatus = undefined;
    } else {
      this.selectedOrderStatus = statuses;
    }
    
    this.loadData(1);
  }

  setPaymentStatusFilter(statuses: PaymentStatus[] | undefined) {
    if (!statuses || statuses.length == 0) {
      this.selectedPaymentStatus = undefined;
    } else {
      this.selectedPaymentStatus = statuses;
    }
    
    this.loadData(1);
  }

  setPaymentMethodFilter(methods: PaymentMethod[] | undefined) {
    if (!methods || methods.length == 0) {
      this.selectedPaymentMethod = undefined;
    } else {
      this.selectedPaymentMethod = methods;
    }
    
    this.loadData(1);
  }

  ngAfterViewInit(): void {
    this.loadData(1);
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

  getSelectedOrderStatusString(elements: OrderStatus[]) {
    return elements.map(e => this.translator.translateOrderStatus(e)).join(", ")
  }

  getSelectedPaymentStatusString(elements: PaymentStatus[]) {
    return elements.map(e => this.translator.translatePaymentStatus(e)).join(", ")
  }

  getSelectedPaymentMethodString(elements: PaymentMethod[]) {
    return elements.map(e => this.translator.translatePaymentMethod(e)).join(", ")
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
