import { Component, DoCheck, ElementRef, Input, ViewChild } from '@angular/core';
import { MenuEventsService } from '../../../service/menu-event/menu-events.service';

@Component({
  selector: 'app-menu-horizontal-element-wrapper',
  templateUrl: './menu-horizontal-element-wrapper.component.html',
  styleUrls: ['./menu-horizontal-element-wrapper.component.scss']
})
export class MenuHorizontalElementWrapperComponent implements DoCheck {

  _name: string | undefined;
  _description: string | undefined;

  @ViewChild('elementContent') elementContent: ElementRef | undefined;
  private previousOffset = 0;

  @Input() set name(value: string) {
    this._name = value;
  }

  @Input() set description(value: string | undefined) {
    this._description = value;
  }

  constructor(private menuEventsService: MenuEventsService) { }

  ngDoCheck(): void {
    if (this.elementContent && this.elementContent.nativeElement.offsetTop != this.previousOffset) {
      this.menuEventsService.onResizeElements();
      this.previousOffset = this.elementContent.nativeElement.offsetTop;
    }
  }

}
