/* tslint:disable */
/* eslint-disable */
import { MenuItemSelectCollectionGet } from './menu-item-select-collection-get';
import { MenuItemToppingCollectionGet } from './menu-item-topping-collection-get';
export interface MenuItemDetailedGet {
  active: boolean;
  available: boolean;
  elementOrder: number;
  isTheOnlyOption: boolean;
  menuItemGroupDescription: string;
  menuItemGroupName: string;
  menuItemGroupRef: string;
  name: string;
  price: number;
  ref: string;
  selectCollections: Array<MenuItemSelectCollectionGet>;
  toppingCollections: Array<MenuItemToppingCollectionGet>;
}
