import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MenuEventsService } from 'src/app/shared/menu-horizontal/service/menu-event/menu-events.service';
import { MenuCategoryGet } from 'src/app/openapi-cli/models';
import { MenuHorizontalElement } from '../../../model/menu-horizontal-element';

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
