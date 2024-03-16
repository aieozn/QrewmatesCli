import { UserRestaurant } from "@common/api-client/models";

export interface ActiveUser {
  ref: string;
  restaurants: UserRestaurant[];
  email: string;
  name: string;
  activeRestaurant: string | undefined;
  token: string;
  tokenExpiration: number;
  refreshToken: string;
  refreshTokenExpiration: number;
}