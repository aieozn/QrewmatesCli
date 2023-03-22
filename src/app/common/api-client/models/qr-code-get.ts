/* tslint:disable */
/* eslint-disable */
import { MultimediaGet } from './multimedia-get';
export interface QrCodeGet {
  image?: MultimediaGet;
  ref: string;
  status: 'PROCESSING' | 'READY' | 'FAILURE';
  style: 'RAW';
}
