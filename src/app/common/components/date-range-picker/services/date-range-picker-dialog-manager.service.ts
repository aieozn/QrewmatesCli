import { Injectable } from "@angular/core";
import { DateRange } from "@angular/material/datepicker";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { DateRangePickerComponent } from "../date-range-picker/date-range-picker.component";

@Injectable({
    providedIn: 'root'
})
export class DateRangePickerDialogManager {

    constructor(
        private dialogService: MatDialog
    ) {

    }

    open() : Observable<DateRange<Date | null> | undefined> {
        return this.dialogService.open(DateRangePickerComponent).afterClosed(); 
    }
}