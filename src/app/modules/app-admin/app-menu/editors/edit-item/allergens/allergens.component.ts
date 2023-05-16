import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { AllergenGet, MenuItemDetailedGet } from '@common/api-client/models';
import { AllergenControllerService } from '@common/api-client/services';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
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
    editItemService: EditItemService
  ) {
    allergensService.getAllergens({
      restaurantRef: this.accountService.getRestaurantRef()
    }).pipe(
      tap(allergens => {
        this.allergens = allergens.map(allergen => ({
          value: allergen,
          checked: false
        }))

        this.checkAllergens(this.fullItem.getValue())
      }),
      takeUntil(this.onDestroy)
    ).subscribe()

    this.fullItem = editItemService.activeItem;

    this.fullItem.pipe(
      tap(item => this.checkAllergens(item))
    )
  }

  checkAllergens(item: MenuItemDetailedGet | undefined) {
    if (item && this.allergens) {
      for (const allergen of this.allergens) {
        if (item.allergens.filter(e => e.ref === allergen.value.ref).length > 0) {
          allergen.checked = true
        } else {
          allergen.checked = false
        }
      }
    } else {
      this.allergens?.forEach(e => e.checked = false);
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
  }
}
