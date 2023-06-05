import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { AllergenGet, MenuItemDetailedGet } from '@common/api-client/models';
import { AllergenControllerService } from '@common/api-client/services';
import { Subject, combineLatest, filter, map, takeUntil, tap, } from 'rxjs';
import { EditItemService } from '../edit-item-service/edit-item.service';

@Component({
  selector: 'app-edit-item-allergens',
  templateUrl: './edit-item-allergens.component.html',
  styleUrls: ['./edit-item-allergens.component.scss']
})
export class EditItemAllergensComponent implements OnDestroy {

  allergens: {
    value: AllergenGet,
    checked: boolean
  }[] | undefined;
  private readonly onDestroy = new Subject<void>();

  constructor(
    allergensService: AllergenControllerService,
    private accountService: AccountService,
    private editItemService: EditItemService
  ) {
    combineLatest([
      this.editItemService.observeItemData().pipe(
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
    this.allergens = this.allergens ? this.allergens : [];

    for (const allergen of allergens) {
      const checked = item.allergens.filter(e => e.ref === allergen.ref).length > 0;

      const existing = this.allergens.filter(e => e.value.ref === allergen.ref);
      if (existing.length === 1) {
        existing[0].checked = checked
      } else {
        this.allergens.push({
          value: allergen,
          checked
        })
      }
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  select(allergen: AllergenGet, selected: boolean) {
    const itemMail = this.editItemService.getItemData()

    itemMail.allergens = itemMail.allergens.filter(e => e.ref !== allergen.ref)
    if (selected) {
      itemMail.allergens.push(allergen)
    }

    this.editItemService.updateItem(itemMail)
  }
}
