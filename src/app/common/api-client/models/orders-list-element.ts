/* tslint:disable */
/* eslint-disable */
export interface OrdersListElement {
  comment?: string;
  created: string;
  edited: boolean;
  orderStatus: 'PLACED' | 'EXPIRED' | 'ABANDONED' | 'REJECTED' | 'ACCEPTED' | 'CANCELED' | 'SERVED';
  paymentMethod: 'CASH' | 'BLIK';
  paymentStatus: 'UNPAID' | 'PAID' | 'RETURNED' | 'WITHDRAWN';
  ref: string;
  restaurantRef: string;
  version: number;
}
