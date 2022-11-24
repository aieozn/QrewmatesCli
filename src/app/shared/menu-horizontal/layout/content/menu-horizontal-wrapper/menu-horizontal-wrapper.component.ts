import { AfterViewInit, Component, ContentChildren, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MenuElementWrapperComponent } from '../menu-horizontal-element-wrapper/menu-horizontal-element-wrapper.component';

@Component({
  selector: 'app-menu-horizontal-wrapper',
  templateUrl: './menu-horizontal-wrapper.component.html',
  styleUrls: ['./menu-horizontal-wrapper.component.scss']
})
export class HorizontalMenuWrapperComponent implements OnInit, AfterViewInit {

  @ContentChildren(MenuElementWrapperComponent) horizontalNavigation: QueryList<MenuElementWrapperComponent> | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.horizontalNavigation) {
        for (let element of this.horizontalNavigation) {
          console.log(element._name);
        }
    }
  }
}
