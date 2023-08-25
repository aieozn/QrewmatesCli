import { UserAction } from "app/common/translators";

export interface UpdateOrderStatusMessage {
    orderAction: UserAction,
    comment: string | undefined
}