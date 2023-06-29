/* tslint:disable */
/* eslint-disable */
import { MenuItemMetaGet } from './menu-item-meta-get';
import { SelectMetaGet } from './select-meta-get';
import { ToppingMetaGet } from './topping-meta-get';
export interface OrderElementGet {
  comment?: string;
  menuItem: MenuItemMetaGet;
  menuItemSelects: Array<SelectMetaGet>;
  menuItemToppings: Array<ToppingMetaGet>;
  price: number;
  ref: string;
}
