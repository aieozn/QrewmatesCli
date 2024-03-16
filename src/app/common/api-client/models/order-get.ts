/* tslint:disable */
/* eslint-disable */
import { RestaurantTableGet } from './restaurant-table-get';
import { UserGet } from './user-get';
export interface OrderGet {
  actionsAllowed: Array<'CREATE' | 'EXPIRE' | 'REJECT' | 'ABANDON' | 'ACCEPT' | 'MODIFY' | 'CANCEL' | 'SERVE' | 'DELETE' | 'PAY_OFFLINE' | 'PAY_ONLINE' | 'RETURN' | 'WITHDRAW'>;
  assignee?: UserGet;
  comment?: string;
  created: string;
  edited: boolean;
  orderNumber: number;
  orderStatus: 'PLACED' | 'EXPIRED' | 'ABANDONED' | 'REJECTED' | 'ACCEPTED' | 'CANCELED' | 'SERVED';
  orderStatusComment?: string;
  paymentMethod: 'CASH' | 'BLIK';
  paymentStatus: 'UNPAID' | 'PAID' | 'RETURNED' | 'WITHDRAWN';
  ref: string;
  restaurantRef: string;
  table?: RestaurantTableGet;
  tableName: string;
  version: number;
}
