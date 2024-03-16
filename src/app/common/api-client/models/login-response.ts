/* tslint:disable */
/* eslint-disable */
import { UserRestaurant } from './user-restaurant';
export interface LoginResponse {
  email: string;
  name: string;
  ref: string;
  refreshToken: string;
  refreshTokenExpiration: number;
  restaurants: Array<UserRestaurant>;
  token: string;
  tokenExpiration: number;
}
