import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-horizontal-menu-element-wrapper',
  templateUrl: './horizontal-menu-element-wrapper.component.html',
  styleUrls: ['./horizontal-menu-element-wrapper.component.scss']
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
