/* tslint:disable */
/* eslint-disable */
import { IdentifiedByRefData } from './identified-by-ref-data';
import { OpeningHoursUtcData } from './opening-hours-utc-data';
export interface RestaurantData {
  backgroundImage?: IdentifiedByRefData;
  callWaiter: boolean;
  currency: 'PLN' | 'EUR' | 'USD';
  isOpen: boolean;
  logo?: IdentifiedByRefData;
  name: string;
  onlinePayment: boolean;
  openingHoursUTC: Array<OpeningHoursUtcData>;
  postPayment: boolean;
  prePayment: boolean;
  qrCodeConfig: IdentifiedByRefData;
  themeMainColor: string;
  themeMainColorContrast: string;
  tipPayment: boolean;
}
