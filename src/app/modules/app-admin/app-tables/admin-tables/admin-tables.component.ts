import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@common/account-utils/services/account.service';
import { RestaurantTableGet } from '@common/api-client/models';
import { RestaurantTableControllerService } from '@common/api-client/services';
import { Subject, takeUntil, tap } from 'rxjs';
import { EditTableService } from '../editors/edit-table/edit-table-service/edit-table.service';
import { ExtendedTableData } from 'app/common/hall/hall/extended-table-data';

@Component({
  selector: 'app-admin-tables',
  templateUrl: './admin-tables.component.html',
  styleUrls: ['./admin-tables.component.scss']
})
export class AdminTablesComponent implements OnDestroy {

  private readonly onDestroy = new Subject<void>();

  tables: ExtendedTableData[] | undefined
  activeTable: RestaurantTableGet | undefined 

  constructor(
    private accountService: AccountService,
    private tablesService: RestaurantTableControllerService,
    private editTableService: EditTableService,
    private router: Router
  ) {
    this.tablesService.getTables({
      restaurantRef: accountService.getRestaurantRef()
    }).pipe(
      tap(r => {
        this.tables = r

        // Activate table if loaded after activation
        if (this.activeTable) {
          this.activateTable(this.activeTable)
        }
      })
    ).subscribe()

    this.editTableService.onTableActivated.pipe(
      tap(activated => this.activateTable(activated)),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.editTableService.onTableDeactivated.pipe(
      tap(() => this.deactivateTables()),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.editTableService.onTableCreated.pipe(
      tap(e => this.onCreateTable(e)),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.editTableService.onTableUpdated.pipe(
      tap(e => this.onUpdateTable(e)),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.editTableService.onTableDeleted.pipe(
      tap(deletedRef => this.onDeleteTable(deletedRef)),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  activateTable(activated: RestaurantTableGet) {
    this.activeTable = activated
    if (!this.tables) return


    for (const table of this.tables) {
      table.color = undefined;

      if (table.ref === activated.ref) {
        table.color = '#38A583';
      }
    }

    this.forceRefresh();
  }

  deactivateTables() {
    this.activeTable = undefined
    if (!this.tables) return

    for (const table of this.tables!) {
      table.color = undefined;
    }

    this.forceRefresh();
  }

  openTableDetails(table: RestaurantTableGet) {
    this.router.navigate(['admin/tables/table/', table.ref])
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private onDeleteTable(ref: string) {
    if (this.tables === undefined) throw 'Tables not defined';
    this.tables = this.tables.filter(e => e.ref !== ref)
  }

  private onUpdateTable(updated: RestaurantTableGet) {
    if (this.tables === undefined) throw 'Tables not defined';

    for (const table of this.tables) {
      if (table.ref === updated.ref) {
        Object.assign(table, updated)
      }
    }

    this.forceRefresh();
  }

  private forceRefresh() {
    if (this.tables === undefined) throw 'Tables not defined';

    this.tables = [
      ...this.tables
    ]
  }

  private onCreateTable(created: RestaurantTableGet) {
    if (this.tables === undefined) throw 'Tables not defined';
    this.tables.push(created)
    this.forceRefresh();
  }
}
