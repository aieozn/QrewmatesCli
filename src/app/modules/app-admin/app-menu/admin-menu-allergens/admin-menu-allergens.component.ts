import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { AllergenGet } from '@common/api-client/models';
import { AllergenControllerService } from '@common/api-client/services';
import { Subject, takeUntil, tap } from 'rxjs';
import { EditorDialogService } from '../editors/editor-dialog.service';

@Component({
  selector: 'app-admin-menu-allergens',
  templateUrl: './admin-menu-allergens.component.html',
  styleUrls: ['../shared-css/menu-element-drag-drop-list.scss', './admin-menu-allergens.component.scss']
})
export class AdminMenuAllergensComponent implements OnDestroy {

  private readonly onDestroy = new Subject<void>();
  allergens: AllergenGet[] = []

  constructor(
    private allergensService: AllergenControllerService,
    accountService: AccountService,
    editorDialogService: EditorDialogService
  ) {
    this.allergensService.getAllergens({
      restaurantRef: accountService.getRestaurantRef()
    }).pipe(
      tap(e => this.allergens = e)
    ).subscribe();

    editorDialogService.onAllergenDeleted.pipe(
      tap(deletedRef => {
        this.allergens = this.allergens.filter(allergen => allergen.ref !== deletedRef)
      }),
      takeUntil(this.onDestroy)
    ).subscribe();

    editorDialogService.onAllergenUpdated.pipe(
      tap(updated => this.onAllergenUpdate(updated)),
      takeUntil(this.onDestroy)
    ).subscribe();

    editorDialogService.onAllergenCreated.pipe(
      tap(created => {
        this.allergens.push(created)
        this.allergens.sort((a, b) => a.name.localeCompare(b.name))
      }),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  onAllergenUpdate(updated: AllergenGet) {
    for (let i = 0; i < this.allergens.length; i++) {
      const existingAllergen = this.allergens[i];
      if (existingAllergen.ref === updated.ref) {
        this.allergens[i] = updated;
        break;
      }
    }

    this.allergens = this.allergens.sort((a, b) => a.name.localeCompare(b.name))
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
