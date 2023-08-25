/* tslint:disable */
/* eslint-disable */
import { UserRestaurant } from './user-restaurant';
export interface LoginResponse {
  email: string;
  expiration: number;
  name: string;
  ref: string;
  restaurants: Array<UserRestaurant>;
  token: string;
}
