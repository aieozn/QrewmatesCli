import { MenuItemDetailedGet, MenuItemSelectGet, MenuItemToppingGet } from "src/app/openapi-cli/models";

export interface OrderElementDataWrapper {
    menuItem: MenuItemDetailedGet;
    selects: Array<MenuItemSelectGet>;
    toppings: Array<MenuItemToppingGet>;
    price: number;
    comment?: string;
}