/* tslint:disable */
/* eslint-disable */
import { IdentifiedByRefData } from './identified-by-ref-data';
import { OrderElementData } from './order-element-data';
export interface OrderData {
  comment?: string;
  elements: Array<OrderElementData>;
  elementsRefs: Array<IdentifiedByRefData>;
  paymentMethod: 'CASH' | 'BLIK';
  table: IdentifiedByRefData;
}
