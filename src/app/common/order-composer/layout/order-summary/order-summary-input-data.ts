import { OrderWrapper } from "@common/api-client/wrapper/order-wrapper";

export interface OrderSummaryInputData {
    restaurantRef: string,
    item: OrderWrapper
}