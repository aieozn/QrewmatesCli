import { Component, Input, OnInit } from '@angular/core';
import { OrderWrapper } from 'src/app/common/api-client/wrapper/order-wrapper';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  @Input('order') order: OrderWrapper | undefined;

  paymentMethods : {
    id: 'CASH' | 'BLIK',
    label: string
  }[] = [{
      id: 'CASH',
      label: $localize`Gotówka`
    },{
      id: 'BLIK',
      label: $localize`BLIK`
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  change(option: 'CASH' | 'BLIK') {
    if (!this.order) { throw 'Order not defined'; }
    this.order.paymentMethod = option;
  }
}
