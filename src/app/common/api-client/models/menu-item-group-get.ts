/* tslint:disable */
/* eslint-disable */
import { MenuItemGet } from './menu-item-get';
import { MultimediaGet } from './multimedia-get';
export interface MenuItemGroupGet {
  available: boolean;
  categoryRef: string;
  description?: string;
  image?: MultimediaGet;
  menuItems: Array<MenuItemGet>;
  name: string;
  ref: string;
  relationType: 'DIRECT' | 'SELECT_BY_NAME';
}
