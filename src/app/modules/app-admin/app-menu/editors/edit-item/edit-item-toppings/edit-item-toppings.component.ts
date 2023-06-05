import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemData, MenuItemDetailedGet, MenuItemToppingCollectionGet } from '@common/api-client/models';
import { MenuItemToppingCollectionControllerService } from '@common/api-client/services';
import { BehaviorSubject, Subject, combineLatest, filter, map, takeUntil, tap } from 'rxjs';
import { EditItemService } from '../edit-item-service/edit-item.service';
import { MenuItemExtendedData } from '../edit-item-service/menu-item-extended-data';

@Component({
  selector: 'app-edit-item-toppings',
  templateUrl: './edit-item-toppings.component.html',
  styleUrls: ['../../../shared-css/drag-box.scss', './edit-item-toppings.component.scss']
})
export class EditItemToppingsComponent implements OnDestroy {
  allCollections: MenuItemToppingCollectionGet[] = []
  checked: MenuItemToppingCollectionGet[] = [];
  notChecked: MenuItemToppingCollectionGet[] = [];

  fullItem: BehaviorSubject<MenuItemExtendedData | undefined> = new BehaviorSubject<MenuItemExtendedData | undefined>(undefined);
  
  private readonly onDestroy = new Subject<void>();

  constructor(
    toppingsService: MenuItemToppingCollectionControllerService,
    accountService: AccountService,
    private editItemService: EditItemService
  ) {
    this.fullItem = editItemService.activeItem;

    combineLatest([
      this.fullItem.pipe(
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

  checkToppings(item: MenuItemData, collections: MenuItemToppingCollectionGet[]) {
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
    const itemMail = this.fullItem.getValue()
    if (!itemMail) { throw 'Item not defined'; }

    itemMail.toppingCollections = itemMail.toppingCollections.filter(e => e.ref !== collection.ref)

    if (selected) {
      itemMail.toppingCollections.push(collection)
    }

    this.checkToppings(itemMail, this.allCollections)

    this.editItemService.onUpdate.next()
  }

  moveUp(element: MenuItemToppingCollectionGet) {
    const itemMail = this.fullItem.getValue()
    if (!itemMail) { throw 'Item not defined'; }

    const index = this.checked.indexOf(element)
    this.checked[index] = this.checked[index + 1]
    this.checked[index + 1] = element

    itemMail.toppingCollections = this.checked.slice()
    this.editItemService.onUpdate.next()
  }

  moveDown(element: MenuItemToppingCollectionGet) {
    const itemMail = this.fullItem.getValue()
    if (!itemMail) { throw 'Item not defined'; }

    const index = this.checked.indexOf(element)
    this.checked[index] = this.checked[index - 1]
    this.checked[index - 1] = element

    itemMail.toppingCollections = this.checked.slice()
    this.editItemService.onUpdate.next()
  }
}
