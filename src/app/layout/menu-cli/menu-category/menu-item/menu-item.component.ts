import { Component, Input, OnInit } from '@angular/core';
import { MenuItemData, MenuItemGet } from 'src/app/openapi-cli/models';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  _item: MenuItemGet | undefined;
  menuItemImageUrl: string | undefined = '/assets/temp/naura.jpeg';

  @Input() set item(value: MenuItemGet) {
    this._item = value;

    if (this._item.image) {
      this.menuItemImageUrl = "/api/multimedia/R00000000000/" + this._item.image.ref;
    } else {
      this.menuItemImageUrl = undefined;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
