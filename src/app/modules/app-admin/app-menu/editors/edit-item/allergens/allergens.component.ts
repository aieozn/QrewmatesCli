import { Component, Input, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { AllergenGet, MenuItemDetailedGet } from '@common/api-client/models';
import { AllergenControllerService } from '@common/api-client/services';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-allergens',
  templateUrl: './allergens.component.html',
  styleUrls: ['./allergens.component.scss']
})
export class AllergensComponent implements OnDestroy {

  _item:  MenuItemDetailedGet | undefined;
  allergens: {
    value: AllergenGet,
    checked: boolean
  }[] | undefined;

  private readonly onDestroy = new Subject<void>();

  @Input() set item(value: MenuItemDetailedGet) {
    this._item = value;

    this.checkAllergens()
  }

  constructor(
    allergensService: AllergenControllerService,
    private accountService: AccountService
  ) {
    allergensService.getAllergens({
      restaurantRef: this.accountService.getRestaurantRef()
    }).pipe(
      tap(allergens => {
        this.allergens = allergens.map(allergen => ({
          value: allergen,
          checked: false
        }))

        this.checkAllergens()
      }),
      takeUntil(this.onDestroy)
    ).subscribe()
  }

  checkAllergens() {
    if (this._item && this.allergens) {
      for (const allergen of this.allergens) {
        if (this._item.allergens.filter(e => e.ref === allergen.value.ref).length > 0) {
          allergen.checked = true
        } else {
          allergen.checked = false
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  select(allergen: AllergenGet, selected: boolean) {
    if (!this._item) { throw 'Item not defined'; }

    this._item.allergens = this._item.allergens.filter(e => e.ref !== allergen.ref)
    if (selected) {
      this._item.allergens.push(allergen)
    }
  }
}
