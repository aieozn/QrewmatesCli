import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemGroupData, MenuItemGroupGet } from '@common/api-client/models';
import { MenuItemGroupControllerService } from '@common/api-client/services';
import { EditorDialogService } from '../editor-dialog.service';

@Component({
  selector: 'app-edit-item-group',
  templateUrl: './edit-item-group.component.html',
  styleUrls: ['../edit-element.scss']
})
export class EditItemGroupComponent {
  originalItemGroup: MenuItemGroupGet | undefined;
  activeItemGroup: MenuItemGroupData | undefined;

  groupFields = {
    groupName: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    groupDescription: new FormControl('', [Validators.maxLength(512)])
  };

  constructor(
    private menuItemGroupService: MenuItemGroupControllerService,
    private accountService: AccountService,
    private editDialogService: EditorDialogService
  ) {
  }

  @Input() set group(value: MenuItemGroupGet) {
    this.originalItemGroup = value;
    this.activeItemGroup = JSON.parse(JSON.stringify(value));

    this.loadItemGroupFieldsValues(value);
  }

  private loadItemGroupFieldsValues(value: MenuItemGroupGet) {
    this.groupFields.groupName.setValue(value.name);
    this.groupFields.groupDescription.setValue(value.description ?? null);
  }

  isValid(validation: {[key: string] : FormControl}) : boolean {
    return !Object.values(validation).map(e => e.invalid).includes(true);
  }

  isUpdated(validation: {[key: string] : FormControl}) : boolean {
    return Object.values(validation).map(e => e.dirty).includes(true);
  }

  onSave() {
    if (!this.activeItemGroup || !this.originalItemGroup) { throw 'Unknown group'; }
    this.activeItemGroup.name = this.groupFields.groupName.value!;
    this.activeItemGroup.description = this.groupFields.groupDescription.value ?? undefined;

    this.menuItemGroupService.putItemGroup({
      restaurantRef: this.accountService.getRestaurantRef(),
      menuItemGroupRef: this.originalItemGroup.ref,
      body: this.activeItemGroup
    }).subscribe(saved => {
      this.editDialogService.itemGroupUpdated(saved);
    })
  }

  cancel() {
    this.editDialogService.closeDialog();
  }

  onDelete() {
    if (this.originalItemGroup !== undefined) {
      const originalGroupCategoryRef = this.originalItemGroup.ref;

      if (confirm($localize`Are you sure you want to delete this element?`)) {
        this.menuItemGroupService.deleteMenuItemGroup({
          restaurantRef: this.accountService.getRestaurantRef(),
          menuItemGroupRef: originalGroupCategoryRef
        }).subscribe(_ => {
          this.editDialogService.itemGroupDeleted(originalGroupCategoryRef)
        })
      }
    } else {
      this.editDialogService.closeDialog();
      console.error('Menu item group not defined');
    }
  }
}
