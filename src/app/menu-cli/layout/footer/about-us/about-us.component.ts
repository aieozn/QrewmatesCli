import { Component, OnInit } from '@angular/core';
import { CliDialogBodyContent } from 'src/app/menu-cli/layout/generic-dialog/model/generic-dialog-body-content';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit, CliDialogBodyContent {

  constructor() { }

  setData(_: any): void {
    
  }

  ngOnInit(): void {
  }

}
