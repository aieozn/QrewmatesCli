import { MenuItemGroupGet } from "src/app/openapi-cli/models";
import { OrderElementDataWrapper } from "src/app/shared/openapi-cli-wrapper/order/order-element-data-wrapper";

export interface OrderMenuItemData {
    restaurantRef: string,
    item: OrderElementDataWrapper | undefined,
    group : MenuItemGroupGet,
    editMode: boolean
}