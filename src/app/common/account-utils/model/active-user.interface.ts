import { UserRestaurant } from "@common/api-client/models";

export interface ActiveUser {
  ref: string;
  expiration: number;
  restaurants: UserRestaurant[];
  token: string;
  email: string;
  name: string;
  activeRestaurant: string | undefined;
}