import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MenuHorizontalElement } from '../../../model/menu-horizontal-element';
import { MenuEventsService } from '../../../service/menu-event/menu-events.service';

@Component({
  selector: 'app-menu-horizontal-element',
  templateUrl: './menu-horizontal-element.component.html',
  styleUrls: ['./menu-horizontal-element.component.scss']
})
export class MenuHorizontalElementComponent implements OnInit {

  public _element: MenuHorizontalElement | undefined;
  public selected: boolean = false;

  @Input() set element(value: MenuHorizontalElement) {
    this._element = value;
  }

  constructor(
    private menuEventsService: MenuEventsService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    
  }

  public createSelectEvent() {
    this.menuEventsService.onElementSelected(this._element!);
  }

  public select() {
    this.selected = true;
    console.info("Selected");
    this.changeDetector.detectChanges();
  }

  public unselect() {
    this.selected = false;
    console.info("Unselected");
    this.changeDetector.detectChanges();
  }

}
