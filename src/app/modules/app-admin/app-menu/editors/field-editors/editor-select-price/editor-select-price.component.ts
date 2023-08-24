import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountService } from '@common/account-utils/services/account.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { EditSelectService } from '../../edit-select/edit-select-service/edit-select.service';

@Component({
  selector: 'app-editor-select-price',
  templateUrl: './editor-select-price.component.html'
})
export class EditorSelectPriceComponent implements OnDestroy {
  private static readonly invalidSelectPriceError = 'ITEM_MAIL_SELECT_INVALID_PRICE';

  private readonly onDestroy = new Subject<void>();
  priceField : FormControl<string | null> = new FormControl<string>('', [Validators.required, Validators.pattern('^[0-9]{0,5}(.[0-9]{1,2}){0,1}')]);
  currency: string | undefined;

  constructor(
    accountService: AccountService,
    private editSelectService: EditSelectService
  ) {
    accountService.getRestaurant().pipe(
      tap(restaurant => this.currency = restaurant.currency)
    ).subscribe();

    this.editSelectService.observeSelectData().pipe(
      tap(e => this.loadPrice(e?.price)),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.priceField.valueChanges.pipe(
      tap(() => this.updatePrice()),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.editSelectService.onSaveTry.pipe(
      tap(() => this.priceField.markAllAsTouched()),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
  
  private loadPrice(value: number | undefined) {
    const fieldValue = this.priceField.value ? this.priceField.value : '';

    if (fieldValue !== value?.toString()) {
      this.priceField.setValue(value !== undefined ? value.toString() : '')
    }

    this.submitErrors()
  }

  private updatePrice() {
    const select = this.editSelectService.getSelectData();
    this.submitErrors()

    console.log(select.price)

    if (this.priceField.valid) {
      if (select.price?.toString() != this.priceField.value) {
        select.price = this.priceField.value == null ? 0 : Number(this.priceField.value);
        this.editSelectService.update(select);
      }
    }
  }

  private submitErrors() {
    if (this.priceField.valid) {
      this.editSelectService.removeError(EditorSelectPriceComponent.invalidSelectPriceError)
    } else {
      this.editSelectService.addError(EditorSelectPriceComponent.invalidSelectPriceError);
    }
  }
}
