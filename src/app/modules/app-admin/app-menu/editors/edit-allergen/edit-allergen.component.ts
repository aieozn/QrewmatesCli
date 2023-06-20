import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@common/account-utils/services/account.service';
import { AllergenGet } from '@common/api-client/models';
import { AllergenControllerService } from '@common/api-client/services';
import { Subject, takeUntil, tap } from 'rxjs';
import { EditorDialogService } from '../editor-dialog.service';

@Component({
  selector: 'app-edit-allergen',
  templateUrl: './edit-allergen.component.html'
})
export class EditAllergenComponent implements OnDestroy {

  private readonly onDestroy = new Subject<void>();
  allergen: AllergenGet | undefined;

  allergenFields = {
    allergenName: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    allergenDescription: new FormControl('', [Validators.required, Validators.maxLength(512)]),
  };

  constructor(
    route: ActivatedRoute,
    private router: Router,
    private allergensService: AllergenControllerService,
    private accountService: AccountService,
    private editorDialogService: EditorDialogService
  ) {
    route.params.pipe(
      tap(params => this.load(params['ellergenRef'])),
      takeUntil(this.onDestroy)
    ).subscribe();
  }
  
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  load(ref: string | null) {
    if (ref) {
      this.allergensService.getAllergen({
        restaurantRef: this.accountService.getRestaurantRef(),
        allergenRef: ref
      }).pipe(
        tap(allergen => {
          this.allergen = allergen
          this.allergenFields.allergenName.setValue(allergen.name)
          this.allergenFields.allergenDescription.setValue(allergen.description)
        })
      ).subscribe()
    }
  }

  isValid(validation: {[key: string] : FormControl}) : boolean {
    return !Object.values(validation).map(e => e.invalid).includes(true);
  }

  isUpdated(validation: {[key: string] : FormControl}) : boolean {
    return Object.values(validation).map(e => e.dirty).includes(true);
  }

  close() {
    this.router.navigate(['/admin/menu/allergens'])
  }

  onSave() {
    if (this.allergen !== undefined) {

      this.allergensService.updateAllergen({
        restaurantRef: this.accountService.getRestaurantRef(),
        allergenRef: this.allergen.ref,
        body: {
          name: this.allergenFields.allergenName.value!,
          description: this.allergenFields.allergenDescription.value!
        }
      }).subscribe(saved => {
        this.editorDialogService.onAllergenUpdated.next(saved);
        this.close()
      })
    } else {
      this.allergensService.createAllergen({
        restaurantRef: this.accountService.getRestaurantRef(),
        body: {
          name: this.allergenFields.allergenName.value!,
          description: this.allergenFields.allergenDescription.value!
        }
      }).subscribe(saved => {
        this.editorDialogService.onAllergenCreated.next(saved);
        this.close()
      })
    }
  }

  onTrySave() {
    this.allergenFields.allergenName.markAllAsTouched();
    this.allergenFields.allergenDescription.markAllAsTouched();
  }

  onDelete() {
    if (this.allergen !== undefined) {
      const originalAllergenRef = this.allergen.ref;

      if (confirm($localize`Are you sure you want to delete this allergen?`)) {
        this.allergensService.deleteAllergen({
          restaurantRef: this.accountService.getRestaurantRef(),
          allergenRef: originalAllergenRef
        }).subscribe(_ => {
          this.editorDialogService.onAllergenDeleted.next(originalAllergenRef)
          this.close()
        })
      }
      
    } else {
      console.error('Category not defined');
    }
  }
}
