import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemData, MenuItemDetailedGet, MenuItemSelectCollectionGet } from '@common/api-client/models';
import { MenuItemSelectCollectionControllerService } from '@common/api-client/services';
import { BehaviorSubject, Subject, combineLatest, filter, map, takeUntil, tap } from 'rxjs';
import { EditItemService } from '../edit-item-service/edit-item.service';

@Component({
  selector: 'app-edit-item-selects',
  templateUrl: './edit-item-selects.component.html',
  styleUrls: ['./edit-item-selects.component.scss']
})
export class EditItemSelectsComponent implements OnDestroy {
  allCollections: MenuItemSelectCollectionGet[] = []
  checked: MenuItemSelectCollectionGet[] = [];
  notChecked: MenuItemSelectCollectionGet[] = [];

  fullItem: BehaviorSubject<MenuItemData | undefined> = new BehaviorSubject<MenuItemData | undefined>(undefined);
  
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
      tap(([, selects]) => this.allCollections = selects),
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

  checkSelects(item: MenuItemData, collections: MenuItemSelectCollectionGet[]) {
    this.checked = [];
    this.notChecked = [];

    for (const itemCollectionRef of item.selectCollections) {
      this.checked.push(this.findCollectionByRef(collections, itemCollectionRef.ref))
    }

    for (const collection of collections) {
      const assigned = item.selectCollections.filter(i => i.ref === collection.ref).length > 0
      if (!assigned) {
        this.notChecked.push(collection);
      }
    }

    this.notChecked = this.notChecked.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
  }

  findCollectionByRef(collections: MenuItemSelectCollectionGet[], ref: string) : MenuItemSelectCollectionGet {
    return collections.filter(c => c.ref === ref)[0]
  }

  select(collection: MenuItemSelectCollectionGet, selected: boolean) {
    const itemMail = this.fullItem.getValue()
    if (!itemMail) { throw 'Item not defined'; }

    itemMail.selectCollections = itemMail.selectCollections.filter(e => e.ref !== collection.ref)

    if (selected) {
      itemMail.selectCollections.push(collection)
    }

    this.checkSelects(itemMail, this.allCollections)

    this.editItemService.onUpdate.next()
  }
}
