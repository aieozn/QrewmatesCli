/* tslint:disable */
/* eslint-disable */
import { RestaurantTableGet } from './restaurant-table-get';
export interface OrderGet {
  actionsAllowed: Array<'CREATE' | 'EXPIRE' | 'REJECT' | 'ABANDON' | 'ACCEPT' | 'MODIFY' | 'CANCEL' | 'SERVE' | 'DELETE' | 'PAY_OFFLINE' | 'PAY_ONLINE' | 'RETURN' | 'WITHDRAW'>;
  comment?: string;
  created: string;
  orderStatus: 'PLACED' | 'EXPIRED' | 'ABANDONED' | 'REJECTED' | 'ACCEPTED' | 'CANCELED' | 'SERVED';
  orderStatusComment?: string;
  paymentMethod: 'CASH' | 'BLIK';
  paymentStatus: 'UNPAID' | 'PAID' | 'RETURNED' | 'WITHDRAWN';
  ref: string;
  restaurantRef: string;
  table: RestaurantTableGet;
  version: number;
}
