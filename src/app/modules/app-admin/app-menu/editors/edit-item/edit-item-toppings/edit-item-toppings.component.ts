import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { IdentifiedByRefData, MenuItemDetailedGet, MenuItemToppingCollectionGet } from '@common/api-client/models';
import { MenuItemToppingCollectionControllerService } from '@common/api-client/services';
import { Subject, combineLatest, filter, map, takeUntil, tap } from 'rxjs';
import { EditItemService } from '../edit-item-service/edit-item.service';

@Component({
  selector: 'app-edit-item-toppings',
  templateUrl: './edit-item-toppings.component.html',
  styleUrls: ['../../../shared-css/drag-box.scss', './edit-item-toppings.component.scss']
})
export class EditItemToppingsComponent implements OnDestroy {
  allCollections: MenuItemToppingCollectionGet[] = []
  checked: MenuItemToppingCollectionGet[] = [];
  notChecked: MenuItemToppingCollectionGet[] = [];
  
  private readonly onDestroy = new Subject<void>();

  constructor(
    toppingsService: MenuItemToppingCollectionControllerService,
    accountService: AccountService,
    private editItemService: EditItemService
  ) {
    combineLatest([
      this.editItemService.observeItemData().pipe(
        filter(e => e !== undefined),
        map(e => e as MenuItemDetailedGet)
      ),
      toppingsService.getToppingCollections({
        restaurantRef: accountService.getRestaurantRef()
      })
    ]).pipe(
      tap(([, toppings]) => this.allCollections = toppings),
      tap(([item, toppings]) => {
        this.checkToppings(item, toppings)
      }),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  checkToppings(item: {
    toppingCollections: IdentifiedByRefData[]
  }, collections: MenuItemToppingCollectionGet[]) {
    this.checked = [];
    this.notChecked = [];

    for (const itemCollectionRef of item.toppingCollections) {
      this.checked.push(this.findCollectionByRef(collections, itemCollectionRef.ref))
    }

    for (const collection of collections) {
      const assigned = item.toppingCollections.filter(i => i.ref === collection.ref).length > 0
      if (!assigned) {
        this.notChecked.push(collection);
      }
    }

    this.notChecked = this.notChecked.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
  }

  findCollectionByRef(collections: MenuItemToppingCollectionGet[], ref: string) : MenuItemToppingCollectionGet {
    return collections.filter(c => c.ref === ref)[0]
  }

  select(collection: MenuItemToppingCollectionGet, selected: boolean) {
    const itemMail = this.editItemService.getItemData()

    itemMail.toppingCollections = itemMail.toppingCollections.filter(e => e.ref !== collection.ref)

    if (selected) {
      itemMail.toppingCollections.push(collection)
    }

    this.checkToppings(itemMail, this.allCollections)

    this.editItemService.update(itemMail)
  }

  moveUp(element: MenuItemToppingCollectionGet) {
    const itemMail = this.editItemService.getItemData()

    const index = this.checked.indexOf(element)
    this.checked[index] = this.checked[index + 1]
    this.checked[index + 1] = element

    itemMail.toppingCollections = this.checked.slice()
    this.editItemService.update(itemMail)
  }

  moveDown(element: MenuItemToppingCollectionGet) {
    const itemMail = this.editItemService.getItemData()

    const index = this.checked.indexOf(element)
    this.checked[index] = this.checked[index - 1]
    this.checked[index - 1] = element

    itemMail.toppingCollections = this.checked.slice()
    this.editItemService.update(itemMail)
  }
}
