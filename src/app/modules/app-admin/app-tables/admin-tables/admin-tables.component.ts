import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@common/account-utils/services/account.service';
import { RestaurantTableGet } from '@common/api-client/models';
import { RestaurantTableControllerService } from '@common/api-client/services';
import { Subject, takeUntil, tap } from 'rxjs';
import { EditTableService } from '../editors/edit-table/edit-table-service/edit-table.service';

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
    private editTableService: EditTableService,
    private router: Router
  ) {
    this.tablesService.getTables({
      restaurantRef: accountService.getRestaurantRef()
    }).pipe(
      tap(r => this.tables = r)
    ).subscribe()

    this.editTableService.onTableCreated.pipe(
      tap(e => this.onCreateTable(e)),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.editTableService.onTableUpdated.pipe(
      tap(e => this.onUpdateTable(e)),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.editTableService.onTableDeleted.pipe(
      tap(deletedRef => this.tables = this.tables!.filter(table => table.ref !== deletedRef)),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  openTableDetails(table: RestaurantTableGet) {
    this.router.navigate(['admin/tables/table/', table.ref])
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

  private onCreateTable(created: RestaurantTableGet) {
    if (this.tables === undefined) throw 'Tables not defined';

    this.tables = [
      ...this.tables
    ]

    this.tables.push(created)
  }
}
