import { OrderElementDataWrapper } from "src/app/openapi-cli-wrapper/order/order-element-data-wrapper";

export class OrderUtils {

    /**
     * Recalc order price and 
     * @param order 
     */
    public static updateOrderDetails(order: OrderElementDataWrapper) {
        var price = 0;

        price += order.menuItem.price
        order.selects.forEach(s => price += s.price)
        order.toppings.forEach(t => price += t.price)

        order.price = price;
    }
}