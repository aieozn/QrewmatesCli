/* tslint:disable */
/* eslint-disable */
import { MultimediaGet } from './multimedia-get';
import { OpeningHoursUtcGet } from './opening-hours-utc-get';
export interface RestaurantDetailsGet {
  backgroundImage?: MultimediaGet;
  callWaiter: boolean;
  currency: 'PLN' | 'EUR' | 'USD';
  isOpen: boolean;
  logo?: MultimediaGet;
  name: string;
  onlinePayment: boolean;
  openingHoursUTC: Array<OpeningHoursUtcGet>;
  postPayment: boolean;
  prePayment: boolean;
  qrCodeStyle: 'RAW';
  ref: string;
  themeMainColor: string;
  themeMainColorContrast: string;
  tipPayment: boolean;
}
