import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AboutUsComponent>
  ) { }

  ngOnInit(): void {
  }

  public close() {
    this.dialogRef.close();
  }

}
