import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MenuItemData, MenuItemDetailedGet } from '@common/api-client/models';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { EditItemService } from '../edit-item-service/edit-item.service';

@Component({
  selector: 'app-edit-item-settings',
  templateUrl: './edit-item-settings.component.html',
  styleUrls: ['../../edit-element.scss', './edit-item-settings.component.scss']
})
export class EditItemSettingsComponent implements OnDestroy {

  itemFields = {
    itemName: new FormControl<string>('', [Validators.required, Validators.maxLength(255)]),
    itemPrice: new FormControl<string>('', [Validators.required, Validators.pattern('^[0-9]{0,5}(.[0-9]{1,2}){0,1}')])
  };

  _item: MenuItemDetailedGet | undefined;

  private static readonly invalidNameError = 'ITEM_MAIL_NAME';
  private static readonly invalidPriceError = 'ITEM_MAIL_PRICE';
  private readonly onDestroy = new Subject<void>();

  fullItem: BehaviorSubject<MenuItemData | undefined> = new BehaviorSubject<MenuItemData | undefined>(undefined);

  constructor(private editItemService: EditItemService) {
    this.fullItem = editItemService.activeItem;

    this.fullItem.pipe(
      tap(e => this.loadFieldValues(e)),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.itemFields.itemName.valueChanges.pipe(
      tap(value => this.updateName(value)),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.itemFields.itemPrice.valueChanges.pipe(
      tap(value => this.updatePrice(value)),
      takeUntil(this.onDestroy)
    ).subscribe();

    editItemService.onSaveTry.pipe(
      tap(() => this.itemFields.itemName.markAllAsTouched()),
      tap(() => this.itemFields.itemPrice.markAllAsTouched()),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  loadFieldValues(value: MenuItemData | undefined) {
    if (value) {
      const priceString = value.price === 0 ? '' : value.price.toString();
      
      this.itemFields.itemName.setValue(value.name);
      this.itemFields.itemPrice.setValue(priceString);

      this.updateName(value.name)
      this.updatePrice(priceString)
    } else {
      this.itemFields.itemName.setValue('');
      this.itemFields.itemPrice.setValue('');
    }
  }

  private updateName(value: string | null) {
    const itemMail = this.fullItem.getValue()
    if (!itemMail) { throw 'Item not defined'; }

    if (this.itemFields.itemName.valid) {
      this.editItemService.removeError(EditItemSettingsComponent.invalidNameError)
    } else {
      this.editItemService.addError(EditItemSettingsComponent.invalidNameError);
    }

    itemMail.name = value === null ? '' : value;
    this.editItemService.onUpdate.next()
  }

  private updatePrice(value: string | null) {
    const itemMail = this.fullItem.getValue()
    if (!itemMail) { throw 'Item not defined'; }

    if (this.itemFields.itemPrice.valid) {
      this.editItemService.removeError(EditItemSettingsComponent.invalidPriceError)
      itemMail.price = value === null ? 0 : Number(value);
    } else {
      this.editItemService.addError(EditItemSettingsComponent.invalidPriceError);
      itemMail.price = 0;
    }

    this.editItemService.onUpdate.next()
  }
}
