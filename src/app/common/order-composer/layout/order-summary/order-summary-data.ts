import { OrderWrapper } from "src/app/common/api-client/wrapper/order-wrapper";

export interface ExportSummaryData {
    restaurantRef: string,
    item: OrderWrapper
}