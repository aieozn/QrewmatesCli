import { Pipe, PipeTransform } from '@angular/core';
import { OrderGet } from '@common/api-client/models/order-get';

@Pipe({
  name: 'orderAssignee'
})
export class OrderAssigneePipe implements PipeTransform {

  transform(value: OrderGet[], email: string): OrderGet[] {
    if (!value) {
      return value;
    }
    
    return value.filter(item => item.assignee && item.assignee.email === email);
  }

}
