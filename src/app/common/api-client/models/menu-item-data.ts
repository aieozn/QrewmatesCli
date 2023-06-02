/* tslint:disable */
/* eslint-disable */
import { IdentifiedByRefData } from './identified-by-ref-data';
export interface MenuItemData {
  allergens: Array<IdentifiedByRefData>;
  available: boolean;
  menuItemGroupRef: string;
  name: string;
  price: number;
  selectCollections: Array<IdentifiedByRefData>;
  toppingCollections: Array<IdentifiedByRefData>;
}
