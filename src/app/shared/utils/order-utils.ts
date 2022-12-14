import { OrderElementDataWrapper } from "src/app/shared/openapi-cli-wrapper/order/order-element-data-wrapper";

export class OrderUtils {

    /**
     * Recalc order price and 
     * @param order 
     */
    public static updateOrderDetails(order: OrderElementDataWrapper) {
        var price = 0;

        price += order.menuItem.price
        order.menuItemSelects.forEach(s => price += s.price)
        order.menuItemToppings.forEach(t => price += t.price)

        order.price = price;
    }
}