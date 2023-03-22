import { MenuItemGet, MenuItemSelectGet, MenuItemToppingGet } from "src/app/common/api-client/models";

export interface OrderElementDataWrapper {
    comment?: string;
    menuItem: MenuItemGet;
    menuItemSelects: Array<MenuItemSelectGet>;
    menuItemToppings: Array<MenuItemToppingGet>;
    price: number;
}