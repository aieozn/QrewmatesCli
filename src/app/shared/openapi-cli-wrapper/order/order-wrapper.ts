import { IdentifiedByRefData } from "src/app/openapi-cli/models";
import { OrderElementDataWrapper } from "./order-element-data-wrapper";

export interface OrderWrapper {
    comment?: string;
    items: Array<OrderElementDataWrapper>;
    price: number;
    paymentMethod: 'CASH' | 'BLIK';
    table: IdentifiedByRefData
}