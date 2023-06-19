/* tslint:disable */
/* eslint-disable */
import { IdentifiedByRefData } from './identified-by-ref-data';
export interface MenuItemSelectData {
  allergens: Array<IdentifiedByRefData>;
  available: boolean;
  collectionRef: string;
  description?: string;
  name: string;
  price: number;
}
