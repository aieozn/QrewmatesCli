import { Component, Input, OnInit } from '@angular/core';
import { MenuCategoryGet, MenuItemData } from 'src/app/openapi-cli/models';

@Component({
  selector: 'app-menu-horizontal-element',
  templateUrl: './menu-horizontal-element.component.html',
  styleUrls: ['./menu-horizontal-element.component.scss']
})
export class MenuHorizontalElementComponent implements OnInit {

  public _category: MenuCategoryGet | undefined;

  @Input() set category(value: MenuCategoryGet) {
    this._category = value;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
