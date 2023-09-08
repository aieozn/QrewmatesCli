import { InjectionToken } from "@angular/core";
import { OrderComposerDialogManager } from "./services/order-composer-dialog-manager.service";

export const ORDER_COMPOSER_DIALOG_MANAGER_TOKEN = new InjectionToken<OrderComposerDialogManager>('ORDER_COMPOSER_DIALOG_MANAGER_TOKEN');