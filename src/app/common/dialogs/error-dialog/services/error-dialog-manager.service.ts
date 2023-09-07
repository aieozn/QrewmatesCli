import { Injectable } from "@angular/core";
import { ErrorDialogMessage } from "../error-dialog-message";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ErrorDialogComponent } from "../error-dialog/error-dialog.component";

@Injectable({
    providedIn: 'root'
})
export class ErrorDialogManager {

    constructor(
        private dialog: MatDialog
    ) {

    }
    open(message: ErrorDialogMessage) : Observable<void> {
        // TODO fix title
        return this.dialog
          .open(ErrorDialogComponent, {
            disableClose: true,
            data: message
          })
          .afterClosed();
      }
}