import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

  activeTable: RestaurantTableGet | undefined;
  tables: RestaurantTableGet[] | undefined

  tableNameControl = new FormControl<string>('', [Validators.required, Validators.maxLength(32)]);

  constructor(
    tableService: RestaurantTableControllerService,
    private accountService: AccountService,
    private tablesService: RestaurantTableControllerService
  ) {
    tableService.getTables({
      restaurantRef: accountService.getRestaurantRef()
    }).pipe(
      tap(r => this.tables = r)
    ).subscribe()
  }

  openTableDetails(table: RestaurantTableGet) {
    this.activeTable = table;
    this.tableNameControl.setValue(table.name)

    console.log(table.qrCode)
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  save() {
    if (this.activeTable === undefined) throw 'Table not defined';
    
    if (this.tableNameControl.errors) {
      this.tableNameControl.markAllAsTouched();
    } else {
      this.tablesService.putTable({
        restaurantRef: this.accountService.getRestaurantRef(),
        tableRef: this.activeTable.ref,
        body: {
          name: this.tableNameControl.value!,
          posX: this.activeTable.posX,
          posY: this.activeTable.posY
        }
      }).pipe(
        tap(updated => this.onUpdateTable(updated))
      ).subscribe()
    }
  }

  cancel() {
    this.activeTable = undefined;
  }

  deleteTable() {
    if (this.activeTable === undefined) throw 'Table not defined';
    const tableToDelete = this.activeTable;

    if (confirm($localize`Are you sure you want to delete this table?`)) {
      this.tablesService.deleteTable({
        restaurantRef: this.accountService.getRestaurantRef(),
        tableRef: this.activeTable.ref
      }).pipe(
        tap(() => this.onDeleteTable(tableToDelete))
      ).subscribe()
    }
  }

  private onDeleteTable(deleted: RestaurantTableGet) {
    if (this.tables === undefined) throw 'Tables not defined';
    this.tables = this.tables.filter(e => e.ref !== deleted.ref)

    this.activeTable = undefined;
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

    this.activeTable = undefined
  }
}
