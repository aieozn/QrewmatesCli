import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MenuCategoryGet } from 'src/app/openapi-cli/models';
import { MenuEventsService } from '../../../shared/menu-horizontal/service/menu-event/menu-events.service';
@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.scss']
})
export class MenuCategoryComponent implements OnInit {

  // TODO create placeholders

  _category: MenuCategoryGet | undefined;

  @Input() set category(value: MenuCategoryGet) {
    this._category = value;
  }

  constructor(
    private menuEventsService: MenuEventsService
  ) { }

  ngOnInit(): void {
  }

}
