import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemSelectCollectionGet } from '@common/api-client/models';
import { MenuItemSelectCollectionControllerService } from '@common/api-client/services';
import { Subject, tap } from 'rxjs';

@Component({
  selector: 'app-admin-menu-selects',
  templateUrl: './admin-menu-select-collections.component.html',
  styleUrls: ['../shared-css/menu-element-drag-drop-list.scss', './admin-menu-select-collections.component.scss']
})
export class AdminMenuSelectCollectionsComponent implements OnDestroy {
  private readonly onDestroy = new Subject<void>();
  collections: {
    open: boolean
    collection: MenuItemSelectCollectionGet
  }[] = []

  constructor(
    private selectsCollectionService: MenuItemSelectCollectionControllerService,
    private accountService: AccountService
  ) {
    selectsCollectionService.getSelectCollections({
      restaurantRef: accountService.getRestaurantRef()
    }).pipe(
      tap(all => this.collections = all.map(e => ({
        open: false,
        collection: e
      })))
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  extend(collection: MenuItemSelectCollectionGet) {
    this.closeAll();
    this.collections.filter(e => e.collection.ref === collection.ref)[0].open = true;
  }

  closeAll() {
    for (const collection of this.collections) {
      collection.open = false;
    }
  }
}
