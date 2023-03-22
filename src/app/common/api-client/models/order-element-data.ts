/* tslint:disable */
/* eslint-disable */
import { IdentifiedByRefData } from './identified-by-ref-data';
export interface OrderElementData {
  comment?: string;
  menuItem: IdentifiedByRefData;
  menuItemSelects: Array<IdentifiedByRefData>;
  menuItemToppings: Array<IdentifiedByRefData>;
  ref?: string;
}
