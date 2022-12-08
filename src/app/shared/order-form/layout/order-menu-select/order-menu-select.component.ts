import { Component, Input, OnInit } from '@angular/core';
import { OrderUtils } from 'src/app/menu-cli/utils/order-utils';
import { OrderElementDataWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-element-data-wrapper';
import { MenuItemSelectCollectionGet, MenuItemSelectGet } from 'src/app/openapi-cli/models';

@Component({
  selector: 'app-order-menu-select',
  templateUrl: './order-menu-select.component.html',
  styleUrls: ['./order-menu-select.component.scss']
})
export class OrderMenuSelectComponent implements OnInit {

  @Input('collection') collection: MenuItemSelectCollectionGet | undefined;
  @Input('order') order: OrderElementDataWrapper | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  change(select: MenuItemSelectGet) {
    if (!this.order) { throw 'Order not defined'; }
    if (!this.collection) { throw 'Collection not defined'; }

    var collectionSelects: string[] = this.collection.menuItemSelects.map(e => e.ref);
    this.order.selects = this.order.selects.filter(e => collectionSelects.indexOf(e.ref) === -1)

    this.order.selects.push(select);
    
    console.log("Selects updated");
    console.log(this.order);

    OrderUtils.updateOrderDetails(this.order);
  }

}
