import { Component } from '@angular/core';
import { OrderDetailsGet, OrderGet } from '@common/api-client/models';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent {
  orders: OrderGet[] = [];
  
  showDetails(data: OrderDetailsGet) {

  }
}
