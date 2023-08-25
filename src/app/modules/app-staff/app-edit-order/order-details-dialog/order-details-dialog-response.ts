import { UserAction } from "app/common/translators";

export interface OrderDetailsDialogResponse {
    doAction: UserAction | undefined;
}