import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@common/account-utils/services/account.service';
import { RestaurantTableGet } from '@common/api-client/models';
import { RestaurantTableControllerService } from '@common/api-client/services';
import { Subject, tap } from 'rxjs';

@Component({
  selector: 'app-admin-tables',
  templateUrl: './admin-tables.component.html',
  styleUrls: ['./admin-tables.component.scss']
})
export class AdminTablesComponent implements OnDestroy {

  private readonly onDestroy = new Subject<void>();

  tables: RestaurantTableGet[] | undefined

  constructor(
    private accountService: AccountService,
    private tablesService: RestaurantTableControllerService,
    private router: Router
  ) {
    this.tablesService.getTables({
      restaurantRef: accountService.getRestaurantRef()
    }).pipe(
      tap(r => this.tables = r)
    ).subscribe()
  }

  openTableDetails(table: RestaurantTableGet) {
    this.router.navigate(['admin/tables/', table.ref])
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private onDeleteTable(deleted: RestaurantTableGet) {
    if (this.tables === undefined) throw 'Tables not defined';
    this.tables = this.tables.filter(e => e.ref !== deleted.ref)
  }

  private onUpdateTable(updated: RestaurantTableGet) {
    if (this.tables === undefined) throw 'Tables not defined';

    for (const table of this.tables) {
      if (table.ref === updated.ref) {
        Object.assign(table, updated)
      }
    }

    this.tables = [
      ...this.tables
    ]
  }
}
