import { Component, Input } from '@angular/core';
import { StatusLineType } from './status-line-type';

@Component({
  selector: 'app-status-line',
  templateUrl: './status-line.component.html',
  styleUrls: ['./status-line.component.scss']
})
export class StatusLineComponent {
  statuses: StatusLineType[] = []

  active = '';
  activeIndex = -1;

  @Input('statuses') set setStatuses(values: StatusLineType[]) {
    this.statuses = values;
    this.load()
  };

  @Input('active') set setActive(value: string) {
    this.active = value;
    this.load()
  };

  load() {
    if (this.statuses.length > 0 && this.active) {
      this.activeIndex = this.statuses.map(e => e.id).indexOf(this.active)
    }
  }
}
