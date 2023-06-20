import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { AllergenGet } from '@common/api-client/models';
import { AllergenControllerService } from '@common/api-client/services';
import { Subject, combineLatest, takeUntil, tap, } from 'rxjs';
import { EditAllergensService } from './edit-allergens-service/edit-allergens.service';

@Component({
  selector: 'app-edit-allergens',
  templateUrl: './edit-allergens.component.html',
  styleUrls: ['./edit-allergens.component.scss']
})
export class EditAllergensComponent implements OnDestroy {

  allergens: {
    value: AllergenGet,
    checked: boolean
  }[] = [];
  private readonly onDestroy = new Subject<void>();

  constructor(
    allergensService: AllergenControllerService,
    private accountService: AccountService,
    private aditAllergensService: EditAllergensService
  ) {
    combineLatest([
      this.aditAllergensService.observeAllergensData(),
      allergensService.getAllergens({
        restaurantRef: this.accountService.getRestaurantRef()
      })
    ]).pipe(
      tap(([active, all]) => this.checkAllergens(active, all)),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  checkAllergens(active: AllergenGet[], all: AllergenGet[]) {
    for (const allergen of all) {
      const checked = active.filter(e => e.ref === allergen.ref).length > 0;

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
    if (selected) {
      this.aditAllergensService.addAllergen(allergen)
    } else {
      this.aditAllergensService.removeAllergen(allergen)
    }
  }
}
