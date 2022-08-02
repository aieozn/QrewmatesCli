import { Component, ElementRef, HostListener, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MenuCategoryGet } from 'src/app/openapi-cli/models';
import { MenuEventsService } from 'src/app/services/menu-events.service';

@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.scss']
})
export class MenuCategoryComponent implements OnInit {

  _category: MenuCategoryGet | undefined;
  @ViewChild('category') categoryHtmlElement: ElementRef | undefined;

  @Input() set category(value: MenuCategoryGet) {
    this._category = value;
  }

  constructor(
    private menuEventsService: MenuEventsService
  ) { }

  ngOnInit(): void {
  }

}
