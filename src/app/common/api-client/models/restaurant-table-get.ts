/* tslint:disable */
/* eslint-disable */
import { QrCodeGet } from './qr-code-get';
export interface RestaurantTableGet {
  name: string;
  qrCode: QrCodeGet;
  ref: string;
}
