import { IdentifiedByRefData, OrderElementGet } from "../models";
import { OrderElementDataWrapper } from "./order-element-data-wrapper";

export interface OrderWrapper {
    comment?: string;
    activeElements: OrderElementDataWrapper[];
    elements: OrderElementGet[];
    price: number;
    paymentMethod: 'CASH' | 'BLIK';
    table: IdentifiedByRefData;
}