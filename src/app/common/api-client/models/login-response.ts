/* tslint:disable */
/* eslint-disable */
import { UserRestaurant } from './user-restaurant';
export interface LoginResponse {
  expiration: number;
  restaurants: Array<UserRestaurant>;
  token: string;
  userEmail: string;
  userName: string;
}
