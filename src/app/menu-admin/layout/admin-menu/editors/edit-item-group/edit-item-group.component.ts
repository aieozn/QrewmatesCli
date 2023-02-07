import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IdentifiedByRefData, MenuItemGet, MenuItemGroupData, MenuItemGroupGet } from 'src/app/openapi-cli/models';

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
    groupName: new FormControl('', [Validators.required, Validators.maxLength(255)])
  };

  public constructor(
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
  }

  public isValid(validation: {[key: string] : FormControl}) : boolean {
    return !Object.values(validation).map(e => e.invalid).includes(true);
  }

  public isUpdated(validation: {[key: string] : FormControl}) : boolean {
    return Object.values(validation).map(e => e.dirty).includes(true);
  }
}
