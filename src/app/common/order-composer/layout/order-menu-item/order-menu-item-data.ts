import { MenuItemGroupGet } from "src/app/common/api-client/models";
import { OrderElementDataWrapper } from "src/app/common/api-client/wrapper/order-element-data-wrapper";

export interface OrderMenuItemData {
    restaurantRef: string,
    item: OrderElementDataWrapper | undefined,
    group : MenuItemGroupGet,
    editMode: boolean
}