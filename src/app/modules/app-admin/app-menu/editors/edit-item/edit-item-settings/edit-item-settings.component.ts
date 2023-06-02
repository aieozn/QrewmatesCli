import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormControlStatus, Validators } from '@angular/forms';
import { MenuItemData, MenuItemDetailedGet, MenuItemGet } from '@common/api-client/models';
import { BehaviorSubject, Subject, combineLatest, filter, map, takeUntil, tap } from 'rxjs';
import { EditItemService } from '../edit-item-service/edit-item.service';

@Component({
  selector: 'app-edit-item-settings',
  templateUrl: './edit-item-settings.component.html',
  styleUrls: ['../../edit-element.scss', './edit-item-settings.component.scss']
})
export class EditItemSettingsComponent implements OnDestroy {

  itemFields = {
    itemName: new FormControl('', [Validators.required, Validators.maxLength(255)])
  };

  _item: MenuItemDetailedGet | undefined;

  private static readonly invalidNameError = 'ITEM_MAIL_NAME';
  private readonly onDestroy = new Subject<void>();

  fullItem: BehaviorSubject<MenuItemData | undefined> = new BehaviorSubject<MenuItemData | undefined>(undefined);

  constructor(private editItemService: EditItemService) {
    this.fullItem = editItemService.activeItem;

    this.fullItem.pipe(
      filter(e => e !== undefined),
      map(e => e as MenuItemDetailedGet),
      tap(e => this.loadFieldValues(e)),
      takeUntil(this.onDestroy)
    ).subscribe();

    combineLatest([this.itemFields.itemName.valueChanges, this.itemFields.itemName.statusChanges]).pipe(
      tap(([value, status]) => this.updateName(value, status)),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  loadFieldValues(value: MenuItemGet) {
    this.itemFields.itemName.setValue(value.name);
  }

  private updateName(value: string | null, status: FormControlStatus) {
    const itemMail = this.fullItem.getValue()
    if (!itemMail) { throw 'Item not defined'; }

    if (status !== 'VALID') {
      this.editItemService.addError(EditItemSettingsComponent.invalidNameError);
    } else {
      this.editItemService.removeError(EditItemSettingsComponent.invalidNameError)
    }

    itemMail.name = value === null ? '' : value;
    this.editItemService.onUpdate.next()
  }
}
