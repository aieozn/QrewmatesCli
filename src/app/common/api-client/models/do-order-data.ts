/* tslint:disable */
/* eslint-disable */
import { IdentifiedByRefData } from './identified-by-ref-data';
import { OrderElementData } from './order-element-data';
export interface DoOrderData {
  comment?: string;
  elements: Array<OrderElementData>;
  paymentMethod: 'CASH' | 'BLIK';
  table: IdentifiedByRefData;
}
