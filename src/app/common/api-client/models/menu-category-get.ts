/* tslint:disable */
/* eslint-disable */
import { MenuItemGroupGet } from './menu-item-group-get';
import { MultimediaGet } from './multimedia-get';
export interface MenuCategoryGet {
  description?: string;
  elementOrder: number;
  icon?: MultimediaGet;
  menuItemGroups: Array<MenuItemGroupGet>;
  name: string;
  ref: string;
}
