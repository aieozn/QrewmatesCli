/* tslint:disable */
/* eslint-disable */
export interface UserDetailsGet {
  email: string;
  name: string;
  ref: string;
  restaurantRef: string;
  role: 'ROOT' | 'OWNER' | 'ADMIN' | 'STAFF';
}
