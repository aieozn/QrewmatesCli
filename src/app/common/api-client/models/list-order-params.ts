/* tslint:disable */
/* eslint-disable */
export interface ListOrderParams {
  filterField?: 'ORDER_STATUS' | 'PAYMENT_METHOD' | 'CREATED';
  filterValue?: string;
  orderBy: 'ORDER_STATUS' | 'PAYMENT_METHOD' | 'CREATED';
  orderDirection: 'DESC' | 'ASC';
  page: number;
  pageSize: number;
}
