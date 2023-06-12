import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemSelectCollectionGet } from '@common/api-client/models';
import { MenuItemSelectCollectionControllerService } from '@common/api-client/services';
import { Subject, takeUntil, tap } from 'rxjs';
import { EditorDialogService } from '../editors/editor-dialog.service';

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
    private accountService: AccountService,
    private editorDialogService: EditorDialogService
  ) {
    selectsCollectionService.getSelectCollections({
      restaurantRef: accountService.getRestaurantRef()
    }).pipe(
      tap(all => this.collections = all.map(e => ({
        open: false,
        collection: e
      })))
    ).subscribe()

    this.editorDialogService.onSelectCollectionCreated.pipe(
      tap(e => {
        this.collections.push({
          open: false,
          collection: e
        })

        this.sortCollections();
      }),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.editorDialogService.onSelectCollectionUpdated.pipe(
      tap(e => this.onCollecitonUpdate(e)),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.editorDialogService.onSelectCollectionDeleted.pipe(
      tap(deleted => this.collections = this.collections.filter(collection => collection.collection.ref !== deleted)),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  onCollecitonUpdate(updated: MenuItemSelectCollectionGet) {
    for (let i = 0; i < this.collections.length; i++) {
      const existingCollection = this.collections[i].collection;
      if (existingCollection.ref === updated.ref) {
        this.collections[i].collection = updated;
        break;
      }
    }

    this.sortCollections()
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

  private sortCollections() {
    this.collections.sort((a, b) => a.collection.name.localeCompare(b.collection.name))
  }
}
