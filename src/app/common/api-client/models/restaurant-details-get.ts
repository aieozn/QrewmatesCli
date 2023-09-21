/* tslint:disable */
/* eslint-disable */
import { AddressGet } from './address-get';
import { OnlineOrderConfigGet } from './online-order-config-get';
import { OnsiteOrderConfigGet } from './onsite-order-config-get';
import { OpeningHoursUtcGet } from './opening-hours-utc-get';
import { QrCodeConfigGet } from './qr-code-config-get';
import { TableOrderConfigGet } from './table-order-config-get';
import { ThemeGet } from './theme-get';
export interface RestaurantDetailsGet {
  address: AddressGet;
  currency: 'PLN' | 'EUR' | 'USD';
  isOpen: boolean;
  name: string;
  onlineOrderConfig: OnlineOrderConfigGet;
  onsiteOrderConfig: OnsiteOrderConfigGet;
  openingHoursUTC: Array<OpeningHoursUtcGet>;
  qrCodeConfig: QrCodeConfigGet;
  ref: string;
  tableOrderConfig: TableOrderConfigGet;
  theme: ThemeGet;
}
