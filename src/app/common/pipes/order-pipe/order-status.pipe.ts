import { Pipe, PipeTransform } from '@angular/core';
import { OrderGet } from '@common/api-client/models/order-get';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

  transform(value: OrderGet[], ...args: ('PLACED' | 'EXPIRED' | 'ABANDONED' | 'REJECTED' | 'ACCEPTED' | 'CANCELED' | 'SERVED')[]): OrderGet[] {
    if (!value) {
      return value;
    }
    
    return value.filter(item => args.includes(item.orderStatus));
  }

}
