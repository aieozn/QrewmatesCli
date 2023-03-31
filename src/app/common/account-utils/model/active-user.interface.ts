import { UserRestaurant } from "@common/api-client/models";

export interface ActiveUser {
  expiration: number;
  restaurants: UserRestaurant[];
  token: string;
  userEmail: string;
  userName: string;
  activeRestaurant: string | undefined;
}