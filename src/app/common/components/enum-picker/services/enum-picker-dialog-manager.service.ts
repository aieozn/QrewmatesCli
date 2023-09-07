import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { EnumPickerComponent } from "../enum-picker/enum-picker.component";
import { EnumPickerData } from "../enum-picker/enum-picker-data";

@Injectable({
    providedIn: 'root'
})
export class EnumPickerDialogManager {

    constructor(
        private dialogService: MatDialog
    ) {

    }

    open(data: EnumPickerData) : Observable<string[] | undefined> {
        return this.dialogService.open(EnumPickerComponent, {data}).afterClosed(); 
    }
}