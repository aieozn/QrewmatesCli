import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountService } from '@common/account-utils/services/account.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { EditItemService } from '../../edit-item/edit-item-service/edit-item.service';

@Component({
  selector: 'app-editor-item-price',
  templateUrl: './editor-item-price.component.html',
  styleUrls: ['./editor-item-price.component.scss', '../common/field-editor.scss']
})
export class EditorItemPriceComponent implements OnDestroy {

  private static readonly invalidItemPriceError = 'ITEM_MAIL_INVALID_PRICE';

  private readonly onDestroy = new Subject<void>();
  priceField : FormControl<string | null> = new FormControl<string>('', [Validators.required, Validators.pattern('^[0-9]{0,5}(.[0-9]{1,2}){0,1}')]);
  currency: string | undefined;

  constructor(
    accountService: AccountService,
    private editItemService: EditItemService
  ) {
    accountService.getRestaurant().pipe(
      tap(restaurant => this.currency = restaurant.currency)
    ).subscribe();

    this.editItemService.observeItemData().pipe(
      tap(e => {
        if (e) {
          this.loadPrice(e?.price)
        }
      }),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.priceField.valueChanges.pipe(
      tap(() => this.updatePrice()),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.editItemService.onSaveTry.pipe(
      tap(() => this.priceField.markAllAsTouched()),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
  
  private loadPrice(value: number) {
    const fieldValue = this.priceField.value ? this.priceField.value : '';
    if (Number(fieldValue) !== value) {
      this.priceField.setValue(value !== undefined ? value.toString() : '')
    }

    this.submitErrors()
  }

  private updatePrice() {
    const itemMail = this.editItemService.getItemData();
    this.submitErrors()

    if (this.priceField.valid) {
      if (itemMail.price.toString() != this.priceField.value) {
        itemMail.price = this.priceField.value == null ? 0 : Number(this.priceField.value);
        this.editItemService.update(itemMail);
      }
    }
  }

  private submitErrors() {
    if (this.priceField.valid) {
      this.editItemService.removeError(EditorItemPriceComponent.invalidItemPriceError)
    } else {
      this.editItemService.addError(EditorItemPriceComponent.invalidItemPriceError);
    }
  }
}
