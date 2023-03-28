import { MenuItemGet, MenuItemSelectGet, MenuItemToppingGet } from "@common/api-client/models";

export interface OrderElementDataWrapper {
    comment?: string;
    menuItem: MenuItemGet;
    menuItemSelects: MenuItemSelectGet[];
    menuItemToppings: MenuItemToppingGet[];
    price: number;
}