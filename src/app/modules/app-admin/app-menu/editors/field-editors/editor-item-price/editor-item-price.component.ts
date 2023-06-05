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
  itemPrice : FormControl<string | null> = new FormControl<string>('', [Validators.required, Validators.pattern('^[0-9]{0,5}(.[0-9]{1,2}){0,1}')]);
  currency: string | undefined;

  constructor(
    accountService: AccountService,
    private editItemService: EditItemService
  ) {
    accountService.getRestaurant().pipe(
      tap(restaurant => this.currency = restaurant.currency)
    ).subscribe();

    this.itemPrice.valueChanges.pipe(
      tap(value => this.updatePrice(value)),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.editItemService.onSaveTry.pipe(
      tap(() => this.itemPrice.markAllAsTouched()),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private updatePrice(value: string | null) {
    const itemMail = this.editItemService.itemData.getValue()
    if (!itemMail) { throw 'Item not defined'; }

    if (this.itemPrice.valid) {
      this.editItemService.removeError(EditorItemPriceComponent.invalidItemPriceError)
      itemMail.price = value === null ? 0 : Number(value);
    } else {
      this.editItemService.addError(EditorItemPriceComponent.invalidItemPriceError);
      itemMail.price = 0;
    }

    this.editItemService.isUpdated.next(true)
  }
}
