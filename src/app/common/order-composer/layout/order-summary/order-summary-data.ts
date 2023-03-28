import { OrderWrapper } from "@common/api-client/wrapper/order-wrapper";

export interface ExportSummaryData {
    restaurantRef: string,
    item: OrderWrapper
}