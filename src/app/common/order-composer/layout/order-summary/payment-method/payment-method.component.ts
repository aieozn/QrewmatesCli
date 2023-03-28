import { Component, Input } from '@angular/core';
import { OrderWrapper } from '@common/api-client/wrapper/order-wrapper';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent {

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

  change(option: 'CASH' | 'BLIK') {
    if (!this.order) { throw 'Order not defined'; }
    this.order.paymentMethod = option;
  }
}
