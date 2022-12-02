import { Pipe, PipeTransform } from '@angular/core';
import { OrderGet } from 'src/app/openapi-cli/models/order-get';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

  transform(value: OrderGet[], ...args: ('PLACED' | 'EXPIRED' | 'ABANDONED' | 'REJECTED' | 'ACCEPTED' | 'CANCELED' | 'SERVED')[]): OrderGet[] {
    if (!value) {
      return value;
    }

    console.log("ARGS");
    console.log(args);

    return value.filter(item => item.orderStatus === 'PLACED');
  }

}
