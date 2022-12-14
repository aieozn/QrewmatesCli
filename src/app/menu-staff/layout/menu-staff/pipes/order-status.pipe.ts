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
    
    return value.filter(item => args.indexOf(item.orderStatus) !== -1);
  }

}
