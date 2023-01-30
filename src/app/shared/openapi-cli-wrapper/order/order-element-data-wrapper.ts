import { MenuItemDetailedGet, MenuItemGet, MenuItemSelectGet, MenuItemToppingGet } from "src/app/openapi-cli/models";

export interface OrderElementDataWrapper {
    comment?: string;
    menuItem: MenuItemGet;
    menuItemSelects: Array<MenuItemSelectGet>;
    menuItemToppings: Array<MenuItemToppingGet>;
    price: number;
}