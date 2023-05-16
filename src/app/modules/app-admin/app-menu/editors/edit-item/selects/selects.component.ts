import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemDetailedGet, MenuItemSelectCollectionGet } from '@common/api-client/models';
import { MenuItemSelectCollectionControllerService } from '@common/api-client/services';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { EditItemService } from '../edit-item-service/edit-item.service';

@Component({
  selector: 'app-selects',
  templateUrl: './selects.component.html',
  styleUrls: ['./selects.component.scss']
})
export class SelectsComponent implements OnDestroy {
  collections: MenuItemSelectCollectionGet[] | undefined;
  fullItem: BehaviorSubject<MenuItemDetailedGet | undefined> = new BehaviorSubject<MenuItemDetailedGet | undefined>(undefined);
  
  private readonly onDestroy = new Subject<void>();

  constructor(
    selectsService: MenuItemSelectCollectionControllerService,
    private accountService: AccountService,
    private editItemService: EditItemService
  ) {
    selectsService.getSelectCollections({
      restaurantRef: accountService.getRestaurantRef()
    }).pipe(
      tap(collections => this.collections = collections)
    ).subscribe();

    this.fullItem = editItemService.activeItem;
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  select(collection: MenuItemSelectCollectionGet, selected: boolean) {
    const itemMail = this.fullItem.getValue()
    if (!itemMail) { throw 'Item not defined'; }

    itemMail.selectCollections = itemMail.selectCollections.filter(e => e.ref !== collection.ref)

    if (selected) {
      itemMail.selectCollections.push(collection)
    }
  }
}
