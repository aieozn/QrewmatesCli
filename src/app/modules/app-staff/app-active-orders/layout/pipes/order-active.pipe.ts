import { Pipe, PipeTransform } from '@angular/core';
import { OrderGet } from '@common/api-client/models/order-get';

@Pipe({
  name: 'orderActive'
})
export class OrderActivePipe implements PipeTransform {

  transform(value: OrderGet[]): OrderGet[] {
    if (!value) {
      return value;
    }
    
    return value.filter(item => item.actionsAllowed.length > 0);
  }

}
