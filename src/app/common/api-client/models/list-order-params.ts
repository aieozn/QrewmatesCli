/* tslint:disable */
/* eslint-disable */
export interface ListOrderParams {
  createdDateFrom?: string;
  createdDateTo?: string;
  orderBy: 'ORDER_STATUS' | 'PAYMENT_METHOD' | 'PAYMENT_STATUS' | 'CREATED';
  orderDirection: 'DESC' | 'ASC';
  page: number;
  pageSize: number;
}
