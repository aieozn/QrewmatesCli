import { OrderElementDataWrapper } from "./order-element-data-wrapper";

export interface OrderWrapper {
    comment?: string;
    items: Array<OrderElementDataWrapper>;
    price: number;
}