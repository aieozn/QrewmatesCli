import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemDetailedGet, MenuItemSelectCollectionGet } from '@common/api-client/models';
import { MenuItemSelectCollectionControllerService } from '@common/api-client/services';
import { BehaviorSubject, Subject, combineLatest, filter, map, takeUntil, tap } from 'rxjs';
import { EditItemService } from '../edit-item-service/edit-item.service';

@Component({
  selector: 'app-selects',
  templateUrl: './selects.component.html',
  styleUrls: ['./selects.component.scss']
})
export class SelectsComponent implements OnDestroy {
  collections: {
    value: MenuItemSelectCollectionGet,
    checked: boolean
  }[] | undefined;
  fullItem: BehaviorSubject<MenuItemDetailedGet | undefined> = new BehaviorSubject<MenuItemDetailedGet | undefined>(undefined);
  
  private readonly onDestroy = new Subject<void>();

  constructor(
    selectsService: MenuItemSelectCollectionControllerService,
    accountService: AccountService,
    private editItemService: EditItemService
  ) {
    this.fullItem = editItemService.activeItem;

    combineLatest([
      this.fullItem.pipe(
        filter(e => e !== undefined),
        map(e => e as MenuItemDetailedGet)
      ),
      selectsService.getSelectCollections({
        restaurantRef: accountService.getRestaurantRef()
      })
    ]).pipe(
      tap(([item, selects]) => {
        this.checkSelects(item, selects)
      }),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  checkSelects(item: MenuItemDetailedGet, collections: MenuItemSelectCollectionGet[]) {
    this.collections = [];

    for (const collection of collections) {
      const checked = item.selectCollections.filter(e => e.ref == collection.ref).length > 0
      
      this.collections.push({
        value: collection,
        checked
      })
    }
  }

  select(collection: MenuItemSelectCollectionGet, selected: boolean) {
    const itemMail = this.fullItem.getValue()
    if (!itemMail) { throw 'Item not defined'; }

    itemMail.selectCollections = itemMail.selectCollections.filter(e => e.ref !== collection.ref)

    if (selected) {
      itemMail.selectCollections.push(collection)
    }

    this.editItemService.onUpdate.next()
  }
}
