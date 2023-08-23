import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EnumPickerData } from './enum-picker-data';

@Component({
  selector: 'app-enum-picker',
  templateUrl: './enum-picker.component.html',
  styleUrls: ['./enum-picker.component.scss']
})
export class EnumPickerComponent {

  selected: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EnumPickerData,
    private dialogRef: MatDialogRef<EnumPickerComponent>
  ) {
    
  }

  update(value: string, checked: boolean) {
    if (checked) {
      if (!this.selected.includes(value)) this.selected.push(value)
    } else {
      if (this.selected.includes(value)) this.selected.splice(this.selected.indexOf(value), 1)
    }
  }

  proceed() {
    this.dialogRef.close(this.selected);
  }
}
