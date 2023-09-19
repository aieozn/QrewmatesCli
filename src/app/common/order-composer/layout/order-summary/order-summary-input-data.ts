import { OrderWrapper } from "@common/api-client/wrapper/order-wrapper";
import { OrderComposerDialogManager } from "@common/order-composer/services/order-composer-dialog-manager.service";

export interface OrderSummaryInputData {
    restaurantRef: string,
    item: OrderWrapper,
    waiterMode: boolean,
    submitButtonText: string,
    orderComposerDialogManager: OrderComposerDialogManager
}