/* tslint:disable */
/* eslint-disable */
import { IdentifiedByRefData } from './identified-by-ref-data';
export interface MenuItemData {
  available: boolean;
  elementOrder: number;
  menuItemGroupRef: string;
  name: string;
  price?: number;
  selectCollections: Array<IdentifiedByRefData>;
  toppingCollections: Array<IdentifiedByRefData>;
}
