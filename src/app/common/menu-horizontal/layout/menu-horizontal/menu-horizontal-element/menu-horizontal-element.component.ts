import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MenuHorizontalElement } from '../../../model/menu-horizontal-element';
import { MenuEventsService } from '../../../service/menu-event/menu-events.service';

@Component({
  selector: 'app-menu-horizontal-element',
  templateUrl: './menu-horizontal-element.component.html',
  styleUrls: ['./menu-horizontal-element.component.scss']
})
export class MenuHorizontalElementComponent {

  public _element: MenuHorizontalElement | undefined;
  public selected = false;

  @Input() set element(value: MenuHorizontalElement) {
    this._element = value;
  }

  constructor(
    private menuEventsService: MenuEventsService,
    private changeDetector: ChangeDetectorRef
  ) { }

  public createSelectEvent() {
    if (this._element === undefined) {
      throw 'Ement not defined';
    }

    this.menuEventsService.onElementSelected(this._element);
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
