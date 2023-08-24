import { UserActions } from "app/common/translators";

export interface UpdateOrderStatusMessage {
    orderAction: UserActions,
    comment: string | undefined
}