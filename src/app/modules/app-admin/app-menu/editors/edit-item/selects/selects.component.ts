import { Component, Input, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemDetailedGet, MenuItemSelectCollectionGet } from '@common/api-client/models';
import { MenuItemSelectCollectionControllerService } from '@common/api-client/services';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-selects',
  templateUrl: './selects.component.html',
  styleUrls: ['./selects.component.scss']
})
export class SelectsComponent implements OnDestroy {
  _item: MenuItemDetailedGet | undefined;
  collections: {
    value: MenuItemSelectCollectionGet,
    open: boolean
  }[] | undefined;

  private readonly onDestroy = new Subject<void>();

  @Input() set item(value: MenuItemDetailedGet) {
    this._item = value;
  }

  constructor(
    selectsService: MenuItemSelectCollectionControllerService,
    private accountService: AccountService
  ) {
    selectsService.getSelectCollections({
      restaurantRef: accountService.getRestaurantRef()
    }).pipe(
      tap(collections => this.collections = collections.map(collection => ({
        value: collection,
        open: false
      }))),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  select(collection: MenuItemSelectCollectionGet, selected: boolean) {
    if (!this._item) { throw 'Item not defined'; }

    this._item.selectCollections = this._item.selectCollections.filter(e => e.ref !== collection.ref)

    if (selected) {
      this._item.selectCollections.push(collection)
    }
  }
}
