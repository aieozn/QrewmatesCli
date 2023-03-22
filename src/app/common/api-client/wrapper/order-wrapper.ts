import { IdentifiedByRefData } from "../models";
import { OrderElementDataWrapper } from "./order-element-data-wrapper";

export interface OrderWrapper {
    comment?: string;
    items: Array<OrderElementDataWrapper>;
    price: number;
    paymentMethod: 'CASH' | 'BLIK';
    table: IdentifiedByRefData,
    editMode: boolean;
}