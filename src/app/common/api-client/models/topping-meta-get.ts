/* tslint:disable */
/* eslint-disable */
import { MenuItemToppingGet } from './menu-item-topping-get';
export interface ToppingMetaGet {
  collectionName: string;
  deleted: boolean;
  description?: string;
  name: string;
  price: number;
  topping?: MenuItemToppingGet;
  updated: boolean;
}
