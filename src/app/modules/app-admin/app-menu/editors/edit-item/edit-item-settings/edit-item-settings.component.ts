import { Component, OnDestroy } from '@angular/core';
import { MenuItemData } from '@common/api-client/models';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { EditItemService } from '../edit-item-service/edit-item.service';
import { MenuItemExtendedData } from '../edit-item-service/menu-item-extended-data';

@Component({
  selector: 'app-edit-item-settings',
  templateUrl: './edit-item-settings.component.html',
  styleUrls: ['../../edit-element.scss', './edit-item-settings.component.scss']
})
export class EditItemSettingsComponent implements OnDestroy {
  private static readonly invalidNameError = 'ITEM_MAIL_NAME';
  private static readonly invalidPriceError = 'ITEM_MAIL_PRICE';
  private readonly onDestroy = new Subject<void>();

  fullItem: BehaviorSubject<MenuItemExtendedData | undefined> = new BehaviorSubject<MenuItemExtendedData | undefined>(undefined);

  constructor(private editItemService: EditItemService) {
    this.editItemService.clearErrors();
    this.fullItem = editItemService.activeItem;

    this.fullItem.pipe(
      tap(e => this.loadFieldValues(e)),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.itemFields.itemName.valueChanges.pipe(
      tap(value => this.updateName(value)),
      tap(() => this.editItemService.onUpdate.next()),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.itemFields.itemPrice.valueChanges.pipe(
      tap(value => this.updatePrice(value)),
      tap(() => this.editItemService.onUpdate.next()),
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
    const itemMail = this.fullItem.getValue()
    if (!itemMail) { throw 'Item not defined'; }

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
  }
}
