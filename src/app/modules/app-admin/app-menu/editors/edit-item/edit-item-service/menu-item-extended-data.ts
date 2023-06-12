import { IdentifiedByRefData } from "@common/api-client/models";

export interface MenuItemExtendedData {
  menuItemGroupName: string;
  available: boolean;
  menuItemGroupRef: string;
  name: string;
  price: number;
  selectCollections: IdentifiedByRefData[];
  toppingCollections: IdentifiedByRefData[];
}