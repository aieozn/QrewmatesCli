import { OrderWrapper } from "src/app/shared/openapi-cli-wrapper/order/order-wrapper";

export interface ExportSummaryData {
    restaurantRef: string,
    item: OrderWrapper
}