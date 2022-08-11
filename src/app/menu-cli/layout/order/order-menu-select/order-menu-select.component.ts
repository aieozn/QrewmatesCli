import { Component, Input, OnInit } from '@angular/core';
import { MenuItemSelectCollectionGet, OrderElementData } from 'src/app/openapi-cli/models';

@Component({
  selector: 'app-order-menu-select',
  templateUrl: './order-menu-select.component.html',
  styleUrls: ['./order-menu-select.component.scss']
})
export class OrderMenuSelectComponent implements OnInit {

  _collection: MenuItemSelectCollectionGet | undefined;
  @Input() set collection(value: MenuItemSelectCollectionGet) {
    this._collection = value;
  }

  _order: OrderElementData | undefined;
  @Input() set order(value: OrderElementData | undefined) {
    this._order = value;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
