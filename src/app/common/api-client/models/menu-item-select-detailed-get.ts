/* tslint:disable */
/* eslint-disable */
import { AllergenGet } from './allergen-get';
export interface MenuItemSelectDetailedGet {
  allergens: Array<AllergenGet>;
  available: boolean;
  collectionRef: string;
  description?: string;
  name: string;
  price: number;
  ref: string;
}
