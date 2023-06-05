import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemData, MenuItemDetailedGet, MenuItemSelectCollectionGet } from '@common/api-client/models';
import { MenuItemSelectCollectionControllerService } from '@common/api-client/services';
import { Subject, combineLatest, filter, map, takeUntil, tap } from 'rxjs';
import { EditItemService } from '../edit-item-service/edit-item.service';

@Component({
  selector: 'app-edit-item-selects',
  templateUrl: './edit-item-selects.component.html',
  styleUrls: ['../../../shared-css/drag-box.scss', './edit-item-selects.component.scss']
})
export class EditItemSelectsComponent implements OnDestroy {
  allCollections: MenuItemSelectCollectionGet[] = []
  checked: MenuItemSelectCollectionGet[] = [];
  notChecked: MenuItemSelectCollectionGet[] = [];
  
  private readonly onDestroy = new Subject<void>();

  constructor(
    selectsService: MenuItemSelectCollectionControllerService,
    accountService: AccountService,
    private editItemService: EditItemService
  ) {

    combineLatest([
      this.editItemService.observeItemData().pipe(
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
    const itemMail = this.editItemService.getItemData()

    itemMail.selectCollections = itemMail.selectCollections.filter(e => e.ref !== collection.ref)

    if (selected) {
      itemMail.selectCollections.push(collection)
    }

    this.checkSelects(itemMail, this.allCollections)
    this.editItemService.updateItem(itemMail)
  }

  moveUp(element: MenuItemSelectCollectionGet) {
    const itemMail = this.editItemService.getItemData()

    const index = this.checked.indexOf(element)
    this.checked[index] = this.checked[index + 1]
    this.checked[index + 1] = element

    itemMail.selectCollections = this.checked.slice()
    this.editItemService.updateItem(itemMail)
  }

  moveDown(element: MenuItemSelectCollectionGet) {
    const itemMail = this.editItemService.getItemData()


    const index = this.checked.indexOf(element)
    this.checked[index] = this.checked[index - 1]
    this.checked[index - 1] = element

    itemMail.selectCollections = this.checked.slice()
    this.editItemService.updateItem(itemMail)
  }
}
