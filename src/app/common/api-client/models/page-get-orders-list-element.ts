/* tslint:disable */
/* eslint-disable */
import { OrdersListElement } from './orders-list-element';
export interface PageGetOrdersListElement {
  elements: Array<OrdersListElement>;
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}
