import { Component, Input, OnInit } from '@angular/core';
import { MenuCategoryGet } from 'src/app/openapi-cli/models';
import { MenuEventsService } from 'src/app/services/menu-events.service';

@Component({
  selector: 'app-menu-horizontal-element',
  templateUrl: './menu-horizontal-element.component.html',
  styleUrls: ['./menu-horizontal-element.component.scss']
})
export class MenuHorizontalElementComponent implements OnInit {

  public _category: MenuCategoryGet | undefined;
  public selected: boolean = false;

  @Input() set category(value: MenuCategoryGet) {
    this._category = value;
  }

  constructor(private menuEventsService: MenuEventsService) { }

  ngOnInit(): void {
    
  }

  public createSelectEvent() {
    this.menuEventsService.onMenuCategorySelected(this._category!);
  }

  public select() {
    this.selected = true;
    console.info("Selected");
  }

  public unselect() {
    this.selected = false;
    console.info("Unselected");
  }

}
