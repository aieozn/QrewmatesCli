/* tslint:disable */
/* eslint-disable */
import { IdentifiedByRefData } from './identified-by-ref-data';
export interface MenuItemToppingData {
  allergens: Array<IdentifiedByRefData>;
  available: boolean;
  collectionRef: string;
  description?: string;
  elementOrder: number;
  name: string;
  price?: number;
}
