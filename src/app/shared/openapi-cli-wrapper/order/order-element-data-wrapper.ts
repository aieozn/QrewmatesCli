import { MenuItemDetailedGet, MenuItemSelectGet, MenuItemToppingGet } from "src/app/openapi-cli/models";

export interface OrderElementDataWrapper {
    comment?: string;
    menuItem: MenuItemDetailedGet;
    menuItemSelects: Array<MenuItemSelectGet>;
    menuItemToppings: Array<MenuItemToppingGet>;
    price: number;
}