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
  activeIndex = 0;

  @Input('statuses') set source(values: StatusLineType[]) {
    this.statuses = values;
    this.activeIndex = this.statuses.map(e => e.id).indexOf(this.active)
  };
}
