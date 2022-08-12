import { Component, Input, OnInit } from '@angular/core';
import { MenuItemSelectCollectionGet, MenuItemSelectGet, OrderElementData } from 'src/app/openapi-cli/models';

@Component({
  selector: 'app-order-menu-select',
  templateUrl: './order-menu-select.component.html',
  styleUrls: ['./order-menu-select.component.scss']
})
export class OrderMenuSelectComponent implements OnInit {

  @Input('collection') collection!: MenuItemSelectCollectionGet;
  @Input('order') order!: OrderElementData;

  constructor() { }

  ngOnInit(): void {
  }

  change(select: MenuItemSelectGet, selected: boolean) {
    var collectionSelects: string[] = this.collection.selects.map(e => e.ref);
    this.order.selects = this.order.selects.filter(e => collectionSelects.indexOf(e.ref) === -1)

    this.order.selects.push(select);
    
    console.log("Selects updated");
    console.log(this.order);
  }

}
