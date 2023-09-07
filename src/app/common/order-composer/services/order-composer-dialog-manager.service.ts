import { MatDialogRef } from "@angular/material/dialog";
import { OrderMenuItemData } from "../layout/order-menu-item/order-menu-item-data";
import { OrderMenuItemComponent } from "../layout/order-menu-item/order-menu-item.component";
import { OrderSummaryComponent } from "../layout/order-summary/order-summary.component";
import { OrderSummaryInputData } from "../layout/order-summary/order-summary-input-data";

export abstract class OrderComposerDialogManager {
    abstract openMenuItemComponent(data: OrderMenuItemData) : MatDialogRef<OrderMenuItemComponent>;
    abstract openSummary(data: OrderSummaryInputData) : MatDialogRef<OrderSummaryComponent>
}