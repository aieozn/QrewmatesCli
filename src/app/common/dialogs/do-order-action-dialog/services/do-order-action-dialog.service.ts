import { Injectable } from "@angular/core";
import { AcceptOrderActionDialogType } from "../../../services/manage-order-status/model/accept-order-aciton-dialog-type";
import { MatDialog } from "@angular/material/dialog";
import { DoOrderActionDialogComponent } from "../do-order-action-dialog/do-order-action-dialog.component";

@Injectable({
    providedIn: 'root'
})
export class DoOrderActionDialogService {

    constructor(
        private dialog: MatDialog
    ) { }

    openAcceptOrderActionDialog(type: AcceptOrderActionDialogType) {
        return this.dialog.open(DoOrderActionDialogComponent, {
            disableClose: true,
            data: {
                type: type
            }
        }).afterClosed();
    }
}