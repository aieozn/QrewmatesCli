import { OrderElementDataWrapper } from "src/app/common/api-client/wrapper/order-element-data-wrapper";

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

    public static getMultimediaUrl(restaurantRef: string, ref: string) {
        return `/api/public/v1/restaurant/${restaurantRef}/multimedia/${ref}`;
    }
}