import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { AccountService } from '@common/account-utils/services/account.service';
import { OrdersListElement } from '@common/api-client/models';
import { OrderInstanceControllerService } from '@common/api-client/services';
import { tap } from 'rxjs';

@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['./admin-history.component.scss']
})
export class AdminHistoryComponent {

  dataSource: OrdersListElement[] = [];
  orderByColumn: "CREATED" | "ORDER_STATUS" | "PAYMENT_METHOD" = "CREATED"
  orderDirection: "ASC" | "DESC" = "ASC"
  displayedColumns = [
    "ref",
    "orderStatus",
    "actions"
  ]

  constructor(
    private orderService: OrderInstanceControllerService,
    private accountService: AccountService,
    private dialogService: MatDialog
  ) {
    orderService.getOrders({
      restaurantRef: this.accountService.getRestaurantRef(),
      listOrderParams: {
        orderBy: this.orderByColumn,
        orderDirection: this.orderDirection,
        page: 1,
        pageSize: 10
      }
    }).pipe(
      tap(e => this.dataSource = e)
    ).subscribe();
  }

  changeSort(event: Sort) {
    console.log(event)
  }
}
