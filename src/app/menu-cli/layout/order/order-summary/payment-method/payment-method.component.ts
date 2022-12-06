import { Component, Input, OnInit } from '@angular/core';
import { OrderWrapper } from 'src/app/openapi-cli-wrapper/order/order-wrapper';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  @Input('order') order: OrderWrapper | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  change(option: 'CASH' | 'BLIK') {
    if (!this.order) { throw 'Order not defined'; }
    this.order.paymentMethod = option;
  }
}
