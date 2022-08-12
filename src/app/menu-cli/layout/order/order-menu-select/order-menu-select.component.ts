import { Component, Input, OnInit } from '@angular/core';
import { OrderUtils } from 'src/app/menu-cli/utils/order-utils';
import { OrderElementDataWrapper } from 'src/app/openapi-cli-wrapper/order/order-element-data-wrapper';
import { MenuItemSelectCollectionGet, MenuItemSelectGet, OrderElementData } from 'src/app/openapi-cli/models';

@Component({
  selector: 'app-order-menu-select',
  templateUrl: './order-menu-select.component.html',
  styleUrls: ['./order-menu-select.component.scss']
})
export class OrderMenuSelectComponent implements OnInit {

  @Input('collection') collection!: MenuItemSelectCollectionGet;
  @Input('order') order!: OrderElementDataWrapper;

  constructor() { }

  ngOnInit(): void {
  }

  change(select: MenuItemSelectGet, selected: boolean) {
    var collectionSelects: string[] = this.collection.selects.map(e => e.ref);
    this.order.selects = this.order.selects.filter(e => collectionSelects.indexOf(e.ref) === -1)

    this.order.selects.push(select);
    
    console.log("Selects updated");
    console.log(this.order);

    OrderUtils.updateOrderDetails(this.order);
  }

}
