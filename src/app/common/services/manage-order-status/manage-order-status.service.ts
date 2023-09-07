import { Injectable } from "@angular/core";
import { UserAction } from "../../translators";
import { AcceptOrderActionDialogType } from "./model/accept-order-aciton-dialog-type";
import { DoOrderActionDialogService } from "app/common/dialogs/do-order-action-dialog/services/do-order-action-dialog.service";
import { first, map, tap } from "rxjs";
import { AcceptOrderActionResult } from "./model/accept-order-action-result";
import { OrderStatusControllerService } from "@common/api-client/services";

@Injectable({
    providedIn: 'root'
})
export class ManageOrderStatusService {

    constructor(
        private doOrderActionDialogService: DoOrderActionDialogService,
        private orderStatusService: OrderStatusControllerService
    ) {

    }

    handleAction(restaurantRef: string, orderRef: string, action: UserAction) {
        if (['REJECT', 'CANCEL'].includes(action)) {
            this.handleActionWithDialog(restaurantRef, orderRef, action as AcceptOrderActionDialogType);
        } else {
            this.doAction(restaurantRef, orderRef, action, undefined);
        }
    }
    
    private handleActionWithDialog(restaurantRef: string, orderRef: string, action: AcceptOrderActionDialogType) {
    return this.doOrderActionDialogService
        .openAcceptOrderActionDialog(action)
        .pipe(
            first(),
            map(e => e as AcceptOrderActionResult),
            tap(e => {
                if (e.proceed) {
                    this.doAction(restaurantRef, orderRef, action, e.message);
                }
            })
        ).subscribe()
    }

    private doAction(restaurantRef: string, orderRef: string, action: UserAction, comment: string | undefined) {
        this.orderStatusService.updateStatus({
            restaurantRef: restaurantRef,
            orderInstanceRef: orderRef,
            body: {
                orderAction: action,
                comment: comment
            }
        }).subscribe();
    }
}