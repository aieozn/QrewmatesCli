import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemData, MenuItemDetailedGet, MenuItemToppingCollectionGet } from '@common/api-client/models';
import { MenuItemToppingCollectionControllerService } from '@common/api-client/services';
import { BehaviorSubject, Subject, combineLatest, filter, map, takeUntil, tap } from 'rxjs';
import { EditItemService } from '../edit-item-service/edit-item.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-edit-item-toppings',
  templateUrl: './edit-item-toppings.component.html',
  styleUrls: ['./edit-item-toppings.component.scss']
})
export class EditItemToppingsComponent implements OnDestroy {
  allCollections: MenuItemToppingCollectionGet[] = []
  checked: MenuItemToppingCollectionGet[] = [];
  notChecked: MenuItemToppingCollectionGet[] = [];

  fullItem: BehaviorSubject<MenuItemData | undefined> = new BehaviorSubject<MenuItemData | undefined>(undefined);
  
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

  dragDropListCaught(event: CdkDragDrop<string[]>) {
    const itemMail = this.fullItem.getValue()
    if (!itemMail) { throw 'Item not defined'; }

    if (event.previousIndex != event.currentIndex) {
      const newIntex = event.currentIndex;
      const oldIndex = event.previousIndex
      this.checked.splice(newIntex, 0, this.checked.splice(oldIndex, 1)[0]);

      itemMail.toppingCollections = this.checked.slice()
      this.editItemService.onUpdate.next()
    }
  }
}