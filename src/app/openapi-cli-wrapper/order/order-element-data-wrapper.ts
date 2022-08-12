import { MenuItemDetailedGet, MenuItemSelectGet, MenuItemToppingGet, OrderElementData } from "src/app/openapi-cli/models";

export interface OrderElementDataWrapper {
    menuItem: MenuItemDetailedGet;
    selects: Array<MenuItemSelectGet>;
    toppings: Array<MenuItemToppingGet>;
    price: number;
}