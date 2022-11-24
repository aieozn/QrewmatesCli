import { AfterViewInit, Component, ContentChildren, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MenuElementWrapperComponent } from '../horizontal-menu-element-wrapper/horizontal-menu-element-wrapper.component';

@Component({
  selector: 'app-horizontal-menu-wrapper',
  templateUrl: './horizontal-menu-wrapper.component.html',
  styleUrls: ['./horizontal-menu-wrapper.component.scss']
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
