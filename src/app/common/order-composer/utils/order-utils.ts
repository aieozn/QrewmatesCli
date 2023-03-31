import { OrderElementDataWrapper } from "@common/api-client/wrapper/order-element-data-wrapper";

export class OrderUtils {

    /**
     * Recalc order price and 
     * @param order 
     */
    static updateOrderDetails(order: OrderElementDataWrapper) {
        let price = 0;

        price += order.menuItem.price
        order.menuItemSelects.forEach(s => price += s.price)
        order.menuItemToppings.forEach(t => price += t.price)

        order.price = price;
    }

    static getMultimediaUrl(restaurantRef: string, ref: string) {
        return `/api/public/v1/restaurant/${restaurantRef}/multimedia/${ref}`;
    }
}