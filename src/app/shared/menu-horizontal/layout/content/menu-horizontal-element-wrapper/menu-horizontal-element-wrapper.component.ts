import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-horizontal-element-wrapper',
  templateUrl: './menu-horizontal-element-wrapper.component.html',
  styleUrls: ['./menu-horizontal-element-wrapper.component.scss']
})
export class MenuElementWrapperComponent implements OnInit {

  _name: string | undefined;

  @Input() set name(value: string) {
    this._name = value;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
