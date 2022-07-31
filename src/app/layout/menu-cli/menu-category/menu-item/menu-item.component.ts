import { Component, Input, OnInit } from '@angular/core';
import { MenuItemData, MenuItemGet } from 'src/app/openapi-cli/models';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  _item: MenuItemGet | undefined;

  @Input() set item(value: MenuItemGet) {
    this._item = value;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
