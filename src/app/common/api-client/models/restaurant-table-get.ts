/* tslint:disable */
/* eslint-disable */
import { QrCodeGet } from './qr-code-get';
export interface RestaurantTableGet {
  name: string;
  posX: number;
  posY: number;
  qrCode: QrCodeGet;
  ref: string;
}
