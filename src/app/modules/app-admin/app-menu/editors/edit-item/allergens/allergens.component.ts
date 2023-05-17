import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { AllergenGet, MenuItemDetailedGet } from '@common/api-client/models';
import { AllergenControllerService } from '@common/api-client/services';
import { BehaviorSubject, Subject, combineLatest, filter, map, takeUntil, tap, } from 'rxjs';
import { EditItemService } from '../edit-item-service/edit-item.service';

@Component({
  selector: 'app-allergens',
  templateUrl: './allergens.component.html',
  styleUrls: ['./allergens.component.scss']
})
export class AllergensComponent implements OnDestroy {

  allergens: {
    value: AllergenGet,
    checked: boolean
  }[] | undefined;

  fullItem: BehaviorSubject<MenuItemDetailedGet | undefined> = new BehaviorSubject<MenuItemDetailedGet | undefined>(undefined);
  private readonly onDestroy = new Subject<void>();

  constructor(
    allergensService: AllergenControllerService,
    private accountService: AccountService,
    private editItemService: EditItemService
  ) {
    this.fullItem = editItemService.activeItem;


    combineLatest([
      this.fullItem.pipe(
        filter(e => e !== undefined),
        map(e => e as MenuItemDetailedGet)
      ),
      allergensService.getAllergens({
        restaurantRef: this.accountService.getRestaurantRef()
      })
    ]).pipe(
      tap(([item, allergens]) => {
        this.checkAllergens(item, allergens)
      }),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  checkAllergens(item: MenuItemDetailedGet, allergens: AllergenGet[]) {
    this.allergens = [];

    for (const allergen of allergens) {
      const checked = item.allergens.filter(e => e.ref === allergen.ref).length > 0;

      this.allergens.push({
        value: allergen,
        checked
      })
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  select(allergen: AllergenGet, selected: boolean) {
    const itemMail = this.fullItem.getValue()
    if (!itemMail) { throw 'Item not defined'; }

    itemMail.allergens = itemMail.allergens.filter(e => e.ref !== allergen.ref)
    if (selected) {
      itemMail.allergens.push(allergen)
    }

    this.editItemService.onUpdate.next()
  }
}
