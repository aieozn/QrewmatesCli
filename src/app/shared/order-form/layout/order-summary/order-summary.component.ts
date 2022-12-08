import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/menu-cli/services/order/order.service';
import { OrderWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-wrapper';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  order: OrderWrapper;
  
  constructor(private orderService: OrderService) {
    this.order = orderService.getOrder();
  }

  ngOnInit(): void {
    console.log("XX")
  }

}
