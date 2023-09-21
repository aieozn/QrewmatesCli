/* tslint:disable */
/* eslint-disable */
import { IdentifiedByRefData } from './identified-by-ref-data';
import { OnlineOrderConfigData } from './online-order-config-data';
import { OnsiteOrderConfigData } from './onsite-order-config-data';
import { OpeningHoursUtcData } from './opening-hours-utc-data';
import { TableOrderConfigData } from './table-order-config-data';
import { ThemeConfigData } from './theme-config-data';
export interface RestaurantPutData {
  currency: 'PLN' | 'EUR' | 'USD';
  isOpen: boolean;
  name: string;
  onlineOrderConfig: OnlineOrderConfigData;
  onsiteOrderConfig: OnsiteOrderConfigData;
  openingHoursUTC: Array<OpeningHoursUtcData>;
  qrCodeConfig: IdentifiedByRefData;
  tableOrderConfig: TableOrderConfigData;
  theme: ThemeConfigData;
}
