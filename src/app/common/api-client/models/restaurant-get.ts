/* tslint:disable */
/* eslint-disable */
import { OnlineOrderConfigGet } from './online-order-config-get';
import { OnsiteOrderConfigGet } from './onsite-order-config-get';
import { OpeningHoursUtcGet } from './opening-hours-utc-get';
import { TableOrderConfigGet } from './table-order-config-get';
import { ThemeGet } from './theme-get';
export interface RestaurantGet {
  currency: 'PLN' | 'EUR' | 'USD';
  isOpen: boolean;
  name: string;
  onlineOrderConfig: OnlineOrderConfigGet;
  onsiteOrderConfig: OnsiteOrderConfigGet;
  openingHoursUTC: Array<OpeningHoursUtcGet>;
  ref: string;
  tableOrderConfig: TableOrderConfigGet;
  theme: ThemeGet;
  'v': number;
}
