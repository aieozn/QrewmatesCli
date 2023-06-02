import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MenuItemData, MenuItemDetailedGet, MenuItemGroupData } from '@common/api-client/models';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { EditItemService } from '../../edit-item/edit-item-service/edit-item.service';

@Component({
  selector: 'app-edit-item-group-aggregate-settings',
  templateUrl: './edit-item-group-aggregate-settings.component.html',
  styleUrls: ['../../edit-element.scss', './edit-item-group-aggregate-settings.component.scss']
})
export class EditItemGroupAggregateSettingsComponent {
  itemFields = {
    groupName: new FormControl<string>('', [Validators.required, Validators.maxLength(255)]),
    groupDescription: new FormControl<string>('', [Validators.required, Validators.maxLength(255)]),
    itemPrice: new FormControl<string>('', [Validators.required, Validators.pattern('^[0-9]{0,5}(.[0-9]{1,2}){0,1}')])
  };

  _item: MenuItemDetailedGet | undefined;

  private static readonly invalidNameError = 'ITEM_GROUP_NAME';
  private static readonly invalidDescriptionError = 'ITEM_GROUP_DESCRIPTION';
  private static readonly invalidPriceError = 'ITEM_MAIL_PRICE';
  private readonly onDestroy = new Subject<void>();

  fullItem: BehaviorSubject<MenuItemData | undefined> = new BehaviorSubject<MenuItemData | undefined>(undefined);
  fullGroup: BehaviorSubject<MenuItemGroupData | undefined> = new BehaviorSubject<MenuItemGroupData | undefined>(undefined);

  constructor(private editItemService: EditItemService) {
    this.fullItem = editItemService.activeItem;
    this.fullGroup = editItemService.activeGroup;

    this.fullItem.pipe(
      tap(e => this.loadItemFieldValues(e)),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.fullGroup.pipe(
      tap(e => this.loadGroupFieldValues(e)),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.itemFields.groupName.valueChanges.pipe(
      tap(value => this.updateName(value)),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.itemFields.itemPrice.valueChanges.pipe(
      tap(value => this.updatePrice(value)),
      takeUntil(this.onDestroy)
    ).subscribe();

    editItemService.onSaveTry.pipe(
      tap(() => this.itemFields.groupName.markAllAsTouched()),
      tap(() => this.itemFields.itemPrice.markAllAsTouched()),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  loadItemFieldValues(value: MenuItemData | undefined) {
    if (value) {
      const priceString = value.price === 0 ? '' : value.price.toString();
      this.itemFields.itemPrice.setValue(priceString);
      this.updatePrice(priceString)
    } else {
      this.itemFields.itemPrice.setValue('');
    }
  }

  loadGroupFieldValues(value: MenuItemGroupData | undefined) {
    if (value) {
      this.itemFields.groupName.setValue(value.name);
      this.itemFields.groupDescription.setValue(value.description ? value.description : '');
    } else {
      this.itemFields.groupName.setValue('');
      this.itemFields.groupDescription.setValue('');
    }
  }

  private updateName(value: string | null) {
    const group = this.fullGroup.getValue()
    if (!group) { throw 'Item not defined'; }

    if (this.itemFields.groupName.valid) {
      this.editItemService.removeError(EditItemGroupAggregateSettingsComponent.invalidNameError)
    } else {
      this.editItemService.addError(EditItemGroupAggregateSettingsComponent.invalidNameError);
    }

    group.name = value === null ? '' : value;
    this.editItemService.onUpdate.next()
  }

  private updateDescription(value: string | null) {
    const group = this.fullGroup.getValue()
    if (!group) { throw 'Item not defined'; }

    if (this.itemFields.groupDescription.valid) {
      this.editItemService.removeError(EditItemGroupAggregateSettingsComponent.invalidDescriptionError)
    } else {
      this.editItemService.addError(EditItemGroupAggregateSettingsComponent.invalidDescriptionError);
    }

    group.description = value === null ? '' : value;
    this.editItemService.onUpdate.next()
  }

  private updatePrice(value: string | null) {
    const itemMail = this.fullItem.getValue()
    if (!itemMail) { throw 'Item not defined'; }

    if (this.itemFields.itemPrice.valid) {
      this.editItemService.removeError(EditItemGroupAggregateSettingsComponent.invalidPriceError)
      itemMail.price = value === null ? 0 : Number(value);
    } else {
      this.editItemService.addError(EditItemGroupAggregateSettingsComponent.invalidPriceError);
      itemMail.price = 0;
    }

    this.editItemService.onUpdate.next()
  }
}
