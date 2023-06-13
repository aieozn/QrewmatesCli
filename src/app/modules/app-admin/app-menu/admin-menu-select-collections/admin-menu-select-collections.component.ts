import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemSelectCollectionGet } from '@common/api-client/models';
import { MenuItemSelectCollectionControllerService } from '@common/api-client/services';
import { Subject, takeUntil, tap } from 'rxjs';
import { EditorDialogService } from '../editors/editor-dialog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-menu-selects',
  templateUrl: './admin-menu-select-collections.component.html',
  styleUrls: ['../shared-css/menu-element-drag-drop-list.scss', './admin-menu-select-collections.component.scss']
})
export class AdminMenuSelectCollectionsComponent implements OnDestroy {
  private readonly onDestroy = new Subject<void>();


  collections: MenuItemSelectCollectionGet[] = []

  openCollectionRef: string | undefined;

  constructor(
    route: ActivatedRoute,
    private selectsCollectionService: MenuItemSelectCollectionControllerService,
    private accountService: AccountService,
    private editorDialogService: EditorDialogService
  ) {
    selectsCollectionService.getSelectCollections({
      restaurantRef: accountService.getRestaurantRef()
    }).pipe(
      tap(all => this.collections = all)
    ).subscribe()

    this.editorDialogService.onSelectCollectionCreated.pipe(
      tap(e => {
        this.collections.push(e)
        this.sortCollections();
      }),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.editorDialogService.onSelectCollectionUpdated.pipe(
      tap(e => this.onCollecitonUpdate(e)),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.editorDialogService.onSelectCollectionDeleted.pipe(
      tap(deleted => this.collections = this.collections.filter(collection => collection.ref !== deleted)),
      takeUntil(this.onDestroy)
    ).subscribe();

    route.params.pipe(
      tap(params => this.openCollectionRef = params['selectCollectionRef'] ? params['selectCollectionRef'] : undefined),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  onCollecitonUpdate(updated: MenuItemSelectCollectionGet) {
    for (let i = 0; i < this.collections.length; i++) {
      const existingCollection = this.collections[i];
      if (existingCollection.ref === updated.ref) {
        this.collections[i] = updated;
        break;
      }
    }

    this.sortCollections()
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private sortCollections() {
    this.collections.sort((a, b) => a.name.localeCompare(b.name))
  }
}
