/* tslint:disable */
/* eslint-disable */
export interface ListOrderParams {
  createdDateFrom?: string;
  createdDateTo?: string;
  orderBy: 'ORDER_STATUS' | 'PAYMENT_METHOD' | 'PAYMENT_STATUS' | 'CREATED';
  orderDirection: 'DESC' | 'ASC';
  orderStatus?: Array<'PLACED' | 'EXPIRED' | 'ABANDONED' | 'REJECTED' | 'ACCEPTED' | 'CANCELED' | 'SERVED'>;
  page: number;
  pageSize: number;
  paymentMethod?: Array<'CASH' | 'BLIK'>;
  paymentStatus?: Array<'UNPAID' | 'PAID' | 'RETURNED' | 'WITHDRAWN'>;
}
