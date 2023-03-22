/* tslint:disable */
/* eslint-disable */
import { MultimediaGet } from './multimedia-get';
export interface UserRestaurant {
  backgroundImage?: MultimediaGet;
  currency: 'PLN' | 'EUR' | 'USD';
  isOpen: boolean;
  logo?: MultimediaGet;
  name: string;
  ref: string;
  role: 'ROOT' | 'OWNER' | 'ADMIN' | 'STAFF';
}
