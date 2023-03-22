/* tslint:disable */
/* eslint-disable */
import { OrderElementGet } from './order-element-get';
import { RestaurantTableGet } from './restaurant-table-get';
export interface OrderDetailsGet {
  actionsAllowed: Array<'CREATE' | 'EXPIRE' | 'REJECT' | 'ABANDON' | 'ACCEPT' | 'MODIFY' | 'CANCEL' | 'SERVE' | 'DELETE' | 'PAY_OFFLINE' | 'PAY_ONLINE' | 'RETURN' | 'WITHDRAW'>;
  comment?: string;
  created: string;
  items: Array<OrderElementGet>;
  orderStatus: 'PLACED' | 'EXPIRED' | 'ABANDONED' | 'REJECTED' | 'ACCEPTED' | 'CANCELED' | 'SERVED';
  orderStatusComment?: string;
  paymentMethod: 'CASH' | 'BLIK';
  paymentStatus: 'UNPAID' | 'PAID' | 'RETURNED' | 'WITHDRAWN';
  price: number;
  ref: string;
  restaurantRef: string;
  table: RestaurantTableGet;
  version: number;
}
