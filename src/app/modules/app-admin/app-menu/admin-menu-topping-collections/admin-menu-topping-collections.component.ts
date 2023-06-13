import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemToppingCollectionGet } from '@common/api-client/models';
import { MenuItemToppingCollectionControllerService } from '@common/api-client/services';
import { Subject, takeUntil, tap } from 'rxjs';
import { EditorDialogService } from '../editors/editor-dialog.service';

@Component({
  selector: 'app-admin-menu-topping-collections',
  templateUrl: './admin-menu-topping-collections.component.html',
  styleUrls: ['../shared-css/menu-element-drag-drop-list.scss', './admin-menu-topping-collections.component.scss']
})
export class AdminMenuToppingCollectionsComponent implements OnDestroy {
  private readonly onDestroy = new Subject<void>();


  collections: MenuItemToppingCollectionGet[] = []

  openCollectionRef: string | undefined;

  constructor(
    route: ActivatedRoute,
    private toppingsCollectionService: MenuItemToppingCollectionControllerService,
    private accountService: AccountService,
    private editorDialogService: EditorDialogService
  ) {
    toppingsCollectionService.getToppingCollections({
      restaurantRef: accountService.getRestaurantRef()
    }).pipe(
      tap(all => this.collections = all)
    ).subscribe()

    this.editorDialogService.onToppingCollectionCreated.pipe(
      tap(e => {
        this.collections.push(e)
        this.sortCollections();
      }),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.editorDialogService.onToppingCollectionUpdated.pipe(
      tap(e => this.onCollecitonUpdate(e)),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.editorDialogService.onToppingCollectionDeleted.pipe(
      tap(deleted => this.collections = this.collections.filter(collection => collection.ref !== deleted)),
      takeUntil(this.onDestroy)
    ).subscribe();

    route.params.pipe(
      tap(params => this.openCollectionRef = params['toppingCollectionRef'] ? params['toppingCollectionRef'] : undefined),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  onCollecitonUpdate(updated: MenuItemToppingCollectionGet) {
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
