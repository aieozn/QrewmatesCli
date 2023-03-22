import { Component, Input, OnInit } from '@angular/core';
import { OrderUtils } from 'src/app/common/order-composer/utils/order-utils';
import { OrderElementDataWrapper } from 'src/app/common/api-client/wrapper/order-element-data-wrapper';
import { MenuItemSelectCollectionGet, MenuItemSelectGet } from 'src/app/common/api-client/models';

@Component({
  selector: 'app-order-menu-select',
  templateUrl: './order-menu-select.component.html',
  styleUrls: ['./order-menu-select.component.scss']
})
export class OrderMenuSelectComponent implements OnInit {

  _collection: MenuItemSelectCollectionGet | undefined;
  _order: OrderElementDataWrapper | undefined;
  
  selected: MenuItemSelectGet | undefined;

  @Input('collection') set collection(value: MenuItemSelectCollectionGet) {
    this._collection = value;

    this.init();
  }

  @Input('order') set order(value: OrderElementDataWrapper) {
    this._order = value;
    this.init();
  }

  constructor() { }

  ngOnInit(): void {
  }

  init() {
    if (this._collection && this._order) {
      let order = this._order;
      let collection = this._collection;

      // Check if there is selected item
      let selectedList = collection.menuItemSelects.filter(collectionSelect => 
        order.menuItemSelects.map(orderSelect => orderSelect.ref).includes(collectionSelect.ref)
      );

      if (selectedList.length === 0) {
        this.selected = collection.menuItemSelects[0];
      } else {
        this.selected = selectedList[0];
      }

      this.change(this.selected);
    }
  }

  change(select: MenuItemSelectGet) {
    if (!this._order) { throw 'Order not defined'; }
    if (!this._collection) { throw 'Collection not defined'; }

    var collectionSelects: string[] = this._collection.menuItemSelects.map(e => e.ref);
    this._order.menuItemSelects = this._order.menuItemSelects.filter(e => !collectionSelects.includes(e.ref))

    this._order.menuItemSelects.push(select);

    OrderUtils.updateOrderDetails(this._order);
  }

}
