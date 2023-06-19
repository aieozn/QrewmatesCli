import { Component } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { RestaurantTableGet } from '@common/api-client/models';
import { RestaurantTableControllerService } from '@common/api-client/services';
import { tap } from 'rxjs';

@Component({
  selector: 'app-admin-tables',
  templateUrl: './admin-tables.component.html',
  styleUrls: ['./admin-tables.component.scss']
})
export class AdminTablesComponent {

  tables: RestaurantTableGet[] | undefined

  constructor(
    tableService: RestaurantTableControllerService,
    accountService: AccountService
  ) {
    tableService.getTables({
      restaurantRef: accountService.getRestaurantRef()
    }).pipe(
      tap(r => this.tables = r)
    ).subscribe()
  }
}
