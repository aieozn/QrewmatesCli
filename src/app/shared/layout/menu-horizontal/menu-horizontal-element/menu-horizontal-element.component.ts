import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MenuEventsService } from 'src/app/shared/service/menu-event/menu-events.service';
import { MenuCategoryGet } from 'src/app/openapi-cli/models';

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

  constructor(
    private menuEventsService: MenuEventsService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    
  }

  public createSelectEvent() {
    this.menuEventsService.onMenuCategorySelected(this._category!);
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
