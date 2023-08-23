import { Component } from '@angular/core';
import { DateRange, DefaultMatCalendarRangeStrategy, MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: DefaultMatCalendarRangeStrategy,
    }
  ]
})
export class DateRangePickerComponent {
  selectedDateRange: DateRange<Date | null> = new DateRange(null, null);

  constructor(private dialogRef: MatDialogRef<DateRangePickerComponent>) {
  }
  
  _onSelectedChange(date: Date): void {
    if (
      this.selectedDateRange &&
      this.selectedDateRange.start &&
      date >= this.selectedDateRange.start &&
      !this.selectedDateRange.end
    ) {
      this.selectedDateRange = new DateRange(
        this.selectedDateRange.start,
        date
      );


      this.dialogRef.close(this.selectedDateRange);
    } else {
      this.selectedDateRange = new DateRange(date, null);
    }
  }
}
