import { IdentifiedByRef } from "src/app/openapi-cli/models/identified-by-ref";
import { OrderElementDataWrapper } from "./order-element-data-wrapper";

export interface OrderWrapper {
    comment?: string;
    items: Array<OrderElementDataWrapper>;
    price: number;
    paymentMethod: 'CASH' | 'BLIK';
    table: IdentifiedByRef
}