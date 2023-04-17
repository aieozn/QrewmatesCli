import { OrderWrapper } from "@common/api-client/wrapper/order-wrapper";

export interface OrderSummaryOutputData {
    order: OrderWrapper;
    submit: boolean;
}