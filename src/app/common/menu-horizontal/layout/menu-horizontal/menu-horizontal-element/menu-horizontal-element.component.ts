import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MenuHorizontalElement } from '../../../model/menu-horizontal-element';
import { MenuEventsService } from '../../../service/menu-event/menu-events.service';

@Component({
  selector: 'app-menu-horizontal-element',
  templateUrl: './menu-horizontal-element.component.html',
  styleUrls: ['./menu-horizontal-element.component.scss']
})
export class MenuHorizontalElementComponent {

  _element: MenuHorizontalElement | undefined;
  selected = false;

  @Input() set element(value: MenuHorizontalElement) {
    this._element = value;
  }

  constructor(
    private menuEventsService: MenuEventsService,
    private changeDetector: ChangeDetectorRef
  ) { }

  createSelectEvent() {
    if (this._element === undefined) {
      throw 'Ement not defined';
    }

    this.menuEventsService.onElementSelected(this._element);
  }

  select() {
    this.selected = true;
    this.changeDetector.detectChanges();
  }

  unselect() {
    this.selected = false;
    this.changeDetector.detectChanges();
  }

}
