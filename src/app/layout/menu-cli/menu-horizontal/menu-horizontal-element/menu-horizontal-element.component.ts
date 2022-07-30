import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-horizontal-element',
  templateUrl: './menu-horizontal-element.component.html',
  styleUrls: ['./menu-horizontal-element.component.scss']
})
export class MenuHorizontalElementComponent implements OnInit {

  public _name = '';

  @Input() set name(value: string) {
    this._name = value;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
