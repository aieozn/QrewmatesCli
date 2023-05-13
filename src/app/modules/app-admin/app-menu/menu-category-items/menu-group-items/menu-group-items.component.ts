import { Component, Input } from '@angular/core';
import { MenuItemGet } from '@common/api-client/models';

@Component({
  selector: 'app-menu-group-items',
  templateUrl: './menu-group-items.component.html',
  styleUrls: ['../../menu-element-drag-drop-list.scss', './menu-group-items.component.scss']
})
export class MenuGroupItemsComponent {

  _item: MenuItemGet | undefined;

  @Input() set item(value: MenuItemGet) {
    this._item = value;
  }
}
