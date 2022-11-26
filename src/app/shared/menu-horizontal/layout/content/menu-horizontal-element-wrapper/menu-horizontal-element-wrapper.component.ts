import { Component, DoCheck, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MenuEventsService } from '../../../service/menu-event/menu-events.service';

@Component({
  selector: 'app-menu-horizontal-element-wrapper',
  templateUrl: './menu-horizontal-element-wrapper.component.html',
  styleUrls: ['./menu-horizontal-element-wrapper.component.scss']
})
export class MenuHorizontalElementWrapperComponent implements OnInit, DoCheck {

  _name: string | undefined;

  @ViewChild('elementContent') elementContent: ElementRef | undefined;
  private previousOffset = 0;

  @Input() set name(value: string) {
    this._name = value;
  }

  constructor(private menuEventsService: MenuEventsService) { }

  ngDoCheck(): void {
    if (this.elementContent && this.elementContent.nativeElement.offsetTop != this.previousOffset) {
      this.menuEventsService.onResizeElements();
      console.log("ITEM RESIZED")
      this.previousOffset = this.elementContent.nativeElement.offsetTop;
    }
  }

  ngOnInit(): void {
  }

}
