import { Component, Input, OnInit } from '@angular/core';
import { CliDialogBodyContent } from 'src/app/menu-cli/menu-cli-dialog/model/cli-dialog-body-content';

@Component({
  selector: 'app-order-menu-item',
  templateUrl: './order-menu-item.component.html',
  styleUrls: ['./order-menu-item.component.scss']
})
export class OrderMenuItemComponent implements OnInit, CliDialogBodyContent {

  private ref: string | undefined;

  constructor() { }

  setData(data: any): void {
    if (!data.ref) {
      console.error("Item ref not found");
    }

    this.ref = data.ref;
    console.log(this.ref);
  }

  ngOnInit(): void {
  }

}
