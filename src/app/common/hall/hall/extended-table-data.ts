import { RestaurantTableGet } from "@common/api-client/models";

export interface ExtendedTableData extends RestaurantTableGet {
    color?: string
}