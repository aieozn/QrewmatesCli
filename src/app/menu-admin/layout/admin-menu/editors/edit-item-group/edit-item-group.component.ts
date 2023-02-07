import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IdentifiedByRefData, MenuItemGroupData, MenuItemGroupGet } from 'src/app/openapi-cli/models';
import { MenuItemGroupControllerService } from 'src/app/openapi-cli/services';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { EditorDialogService } from '../editor-dialog.service';

@Component({
  selector: 'app-edit-item-group',
  templateUrl: './edit-item-group.component.html',
  styleUrls: ['../edit-element.scss']
})
export class EditItemGroupComponent {
  public originalItemGroup: MenuItemGroupGet | undefined;
  public activeItemGroup: MenuItemGroupData | undefined;
  private itemGroupCategory: IdentifiedByRefData | undefined;

  public groupFields = {
    groupName: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    groupDescription: new FormControl('', [Validators.maxLength(512)])
  };

  public constructor(
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

  @Input() set category(category: IdentifiedByRefData) {
    this.itemGroupCategory = category;
  }

  private loadItemGroupFieldsValues(value: MenuItemGroupGet) {
    this.groupFields.groupName.setValue(value.name);
    this.groupFields.groupDescription.setValue(value.description ?? null);
  }

  public isValid(validation: {[key: string] : FormControl}) : boolean {
    return !Object.values(validation).map(e => e.invalid).includes(true);
  }

  public isUpdated(validation: {[key: string] : FormControl}) : boolean {
    return Object.values(validation).map(e => e.dirty).includes(true);
  }

  public onSave() {
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

  public cancel() {
    this.editDialogService.closeDialog();
  }

  public onDelete() {
    if (this.originalItemGroup !== undefined) {
      let originalGroupCategoryRef = this.originalItemGroup.ref;

      this.menuItemGroupService.deleteMenuItemGroup({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemGroupRef: originalGroupCategoryRef
      }).subscribe(_ => {
        this.editDialogService.itemGroupDeleted(originalGroupCategoryRef)
      })
    } else {
      this.editDialogService.closeDialog();
      console.error('Menu item group not defined');
    }
  }
}
