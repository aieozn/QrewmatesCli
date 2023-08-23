import { Injectable } from "@angular/core";
import { NativeDateAdapter } from "@angular/material/core";

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  override getFirstDayOfWeek(): number {
     return 1;
   }

  //  override getDayOfWeekNames(style: 'long' | 'short' | 'narrow') : string[] {
  //   const names = super.getDayOfWeekNames(style);
  //   console.log(names);
  //   return names;
  //  }
}