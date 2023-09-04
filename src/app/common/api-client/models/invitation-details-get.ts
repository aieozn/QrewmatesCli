/* tslint:disable */
/* eslint-disable */
import { MultimediaGet } from './multimedia-get';
export interface InvitationDetailsGet {
  backgroundImage?: MultimediaGet;
  email: string;
  issued: string;
  logo?: MultimediaGet;
  ref: string;
  restaurantName: string;
  restaurantRef: string;
  role: 'ROOT' | 'OWNER' | 'ADMIN' | 'STAFF';
}
