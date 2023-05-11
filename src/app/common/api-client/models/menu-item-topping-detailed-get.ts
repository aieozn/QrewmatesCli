/* tslint:disable */
/* eslint-disable */
import { AllergenGet } from './allergen-get';
export interface MenuItemToppingDetailedGet {
  active: boolean;
  allergens: Array<AllergenGet>;
  available: boolean;
  collectionRef: string;
  description?: string;
  elementOrder: number;
  name: string;
  price: number;
  ref: string;
}
