import { Component, OnInit } from '@angular/core';
import { CliDialogBodyContent } from 'src/app/menu-cli/menu-cli-dialog/model/cli-dialog-body-content';
import { OrderService } from 'src/app/menu-cli/services/order/order.service';
import { OrderWrapper } from 'src/app/openapi-cli-wrapper/order/order-wrapper';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit, CliDialogBodyContent {

  order: OrderWrapper;
  
  constructor(private orderService: OrderService) {
    this.order = orderService.getOrder();
  }

  setData(data: any): void {
    // No data required
  }

  ngOnInit(): void {
    console.log("XX")
  }

}
