import { Component, Input, OnInit } from '@angular/core';
import { MenuCategoryGet } from 'src/app/openapi-cli/models';

@Component({
  selector: 'app-menu-horizontal',
  templateUrl: './menu-horizontal.component.html',
  styleUrls: ['./menu-horizontal.component.scss']
})
export class MenuHorizontalComponent implements OnInit {

  public _categories: MenuCategoryGet[] = [];

  @Input() set categories(categories: MenuCategoryGet[]) {
    this._categories = categories;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
