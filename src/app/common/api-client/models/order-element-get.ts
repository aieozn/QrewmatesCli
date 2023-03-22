/* tslint:disable */
/* eslint-disable */
import { MenuItemGet } from './menu-item-get';
import { MenuItemSelectGet } from './menu-item-select-get';
import { MenuItemToppingGet } from './menu-item-topping-get';
export interface OrderElementGet {
  comment?: string;
  menuItem: MenuItemGet;
  menuItemSelects: Array<MenuItemSelectGet>;
  menuItemToppings: Array<MenuItemToppingGet>;
  price: number;
  ref: string;
}
