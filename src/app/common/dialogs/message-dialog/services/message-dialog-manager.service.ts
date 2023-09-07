import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { MessageDialogComponent } from "../message-dialog/message-dialog.component";

@Injectable({
    providedIn: 'root'
})
export class MessageDialogManager {

    constructor(
        private dialog: MatDialog
    ) {

    }
    open(message: {message: string}) : Observable<void> {
        // TODO fix title
        return this.dialog
          .open(MessageDialogComponent, {
            data: message
          })
          .afterClosed();
      }
}