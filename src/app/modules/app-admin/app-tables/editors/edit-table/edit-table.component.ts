import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@common/account-utils/services/account.service';
import { RestaurantTableGet } from '@common/api-client/models';
import { RestaurantTableControllerService } from '@common/api-client/services';
import { Subject, catchError, takeUntil, tap } from 'rxjs';
import { EditTableService } from './edit-table-service/edit-table.service';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.scss']
})
export class EditTableComponent implements OnDestroy {

  readonly tableValue = $localize`Table`
  readonly createNewTableValue = $localize`'Create new table'`

  private readonly onDestroy = new Subject<void>();
  table: RestaurantTableGet | undefined;

  tableFields = {
    tableName: new FormControl('', [Validators.required, Validators.maxLength(32)])
  };

  constructor(
    private tablesService: RestaurantTableControllerService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router,
    private editTableService: EditTableService
  ) {
    this.route.params.pipe(
      tap(params => this.reloadComponent(params['tableRef'])),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  private reloadComponent(tableRef: string) {
    if (tableRef) {
      this.tablesService.getTable({
        restaurantRef: this.accountService.getRestaurantRef(),
        tableRef: tableRef
      }).pipe(
        tap(table => this.updateTable(table)),
        catchError(() => {
          this.close()
          throw 'Failed to load category detials'
        })
      ).subscribe()
    } else {
      this.editTableService.clear()
    }
  }

  private updateTable(value: RestaurantTableGet) {
    this.editTableService.onTableActivated.emit(value)
    this.editTableService.update(value);
    this.table = value;
    this.tableFields.tableName.setValue(value.name);
  }

  close() {
    this.editTableService.onTableDeactivated.emit();
    this.router.navigate(['.'], { relativeTo: this.route.parent })
  }

  isValid(validation: {[key: string] : FormControl}) : boolean {
    return !Object.values(validation).map(e => e.invalid).includes(true);
  }

  isUpdated(validation: {[key: string] : FormControl}) : boolean {
    return Object.values(validation).map(e => e.dirty).includes(true);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  onSave() {
    if (this.table !== undefined) {
      this.tablesService.putTable({
        restaurantRef: this.accountService.getRestaurantRef(),
        tableRef: this.table.ref,
        body: {
          name: this.tableFields.tableName.value!,
          posX: this.table.posX,
          posY: this.table.posY
        }
      }).subscribe(saved => {
        this.editTableService.onTableUpdated.emit(saved);
        this.close();
      })
    } else {
      this.tablesService.postTable({
        restaurantRef: this.accountService.getRestaurantRef(),
        body: {
          name: this.tableFields.tableName.value!,
          posX: 0,
          posY: 0
        }
      }).subscribe(saved => {
        this.editTableService.onTableCreated.next(saved);

        this.router.navigate(['./table/', saved.ref], { relativeTo: this.route.parent })
      })
    }
  }

  onDelete() {
    if (this.table !== undefined) {
      const originalTableRef = this.table.ref;

      if (confirm($localize`Are you sure you want to delete this table?`)) {
        this.tablesService.deleteTable({
          restaurantRef: this.accountService.getRestaurantRef(),
          tableRef: originalTableRef
        }).subscribe(_ => {
          this.editTableService.onTableDeleted.next(originalTableRef)
          this.close()
        })
      }
      
    } else {
      console.error('Table not defined');
    }
  }

  onTrySave() {
    this.tableFields.tableName.markAllAsTouched();
  }
}
