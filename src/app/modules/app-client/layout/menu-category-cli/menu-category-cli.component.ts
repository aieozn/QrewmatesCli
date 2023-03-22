import { Component, Input, OnInit } from '@angular/core';
import { MenuCategoryGet } from 'src/app/openapi-cli/models';

@Component({
  selector: 'app-menu-category-cli',
  templateUrl: './menu-category-cli.component.html',
  styleUrls: ['./menu-category-cli.component.scss']
})
export class MenuCategoryCliComponent implements OnInit {

  // TODO create placeholders

  _category: MenuCategoryGet | undefined;

  @Input() set category(value: MenuCategoryGet) {
    this._category = value;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
