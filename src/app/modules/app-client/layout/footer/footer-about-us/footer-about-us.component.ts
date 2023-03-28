import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-footer-about-us',
  templateUrl: './footer-about-us.component.html',
  styleUrls: ['./footer-about-us.component.scss']
})
export class FooterAboutUsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FooterAboutUsComponent>
  ) { }

  ngOnInit(): void {
  }

  public close() {
    this.dialogRef.close();
  }

}