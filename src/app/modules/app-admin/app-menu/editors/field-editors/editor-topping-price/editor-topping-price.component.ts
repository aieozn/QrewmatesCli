import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountService } from '@common/account-utils/services/account.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { EditToppingService } from '../../edit-topping/edit-topping-service/edit-topping.service';

@Component({
  selector: 'app-editor-topping-price',
  templateUrl: './editor-topping-price.component.html'
})
export class EditorToppingPriceComponent implements OnDestroy {
  private static readonly invalidToppingPriceError = 'ITEM_MAIL_TOPPING_INVALID_PRICE';

  private readonly onDestroy = new Subject<void>();
  priceField : FormControl<string | null> = new FormControl<string>('', [Validators.required, Validators.pattern('^[0-9]{0,5}(.[0-9]{1,2}){0,1}')]);
  currency: string | undefined;

  constructor(
    accountService: AccountService,
    private editToppingService: EditToppingService
  ) {
    accountService.getRestaurant().pipe(
      tap(restaurant => this.currency = restaurant.currency)
    ).subscribe();

    this.editToppingService.observeToppingData().pipe(
      tap(e => this.loadPrice(e?.price)),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.priceField.valueChanges.pipe(
      tap(() => this.updatePrice()),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.editToppingService.onSaveTry.pipe(
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
    const topping = this.editToppingService.getToppingData();
    this.submitErrors()

    if (this.priceField.valid) {
      if (topping.price?.toString() != this.priceField.value) {
        topping.price = this.priceField.value == null ? 0 : Number(this.priceField.value);
        this.editToppingService.update(topping);
      }
    }
  }

  private submitErrors() {
    if (this.priceField.valid) {
      this.editToppingService.removeError(EditorToppingPriceComponent.invalidToppingPriceError)
    } else {
      this.editToppingService.addError(EditorToppingPriceComponent.invalidToppingPriceError);
    }
  }
}

