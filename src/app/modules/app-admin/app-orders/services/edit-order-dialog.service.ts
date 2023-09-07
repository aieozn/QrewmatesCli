import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AccountService } from "@common/account-utils/services/account.service";
import { FullWidthDialogService } from "@common/full-width-dialog/service/full-width-dialog.service";
import { OrderSummaryOutputData } from "@common/order-composer/layout/order-summary/order-summary-output-data";
import { OrderSummaryComponent } from "@common/order-composer/layout/order-summary/order-summary.component";
import { OrderService } from "app/common/restaurant-menu/services/order/order.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EditOrderDialogService {
    constructor(
        private dialog: MatDialog,
        private accountService: AccountService,
        private orderService: OrderService
    ) {

    }

    openSummary() : Observable<OrderSummaryOutputData> {
        // TODO fix title
        return this.dialog
          .open(OrderSummaryComponent, FullWidthDialogService.getDefaultDesktopGenericDialogConfig({
            restaurantRef: this.accountService.getRestaurantRef(),
            item: this.orderService.orderChanged.getValue(),
            waiterMode: false,
            submitButtonText: $localize`Save`
          }))
          .afterClosed();
      }
}