import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from '@common/account-utils/services/account.service';
import { OrdersListElement } from '@common/api-client/models';
import { OrderInstanceControllerService } from '@common/api-client/services';
import { Translators } from 'app/common/translators';
import { tap } from 'rxjs';

@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['./admin-history.component.scss']
})
export class AdminHistoryComponent implements AfterViewInit  {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined

  protected translator = Translators

  pageSize = 20;
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
    private accountService: AccountService
  ) {

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
        pageSize: pageSize
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
