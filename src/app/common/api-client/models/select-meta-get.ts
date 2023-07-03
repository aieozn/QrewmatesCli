/* tslint:disable */
/* eslint-disable */
import { MenuItemSelectGet } from './menu-item-select-get';
export interface SelectMetaGet {
  collectionName: string;
  deleted: boolean;
  description?: string;
  name: string;
  price: number;
  select?: MenuItemSelectGet;
  updated: boolean;
}
