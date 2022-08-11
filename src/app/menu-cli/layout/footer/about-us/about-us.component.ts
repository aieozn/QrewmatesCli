import { Component, OnInit } from '@angular/core';
import { CliDialogBodyContent } from 'src/app/menu-cli/menu-cli-dialog/model/cli-dialog-body-content';

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
