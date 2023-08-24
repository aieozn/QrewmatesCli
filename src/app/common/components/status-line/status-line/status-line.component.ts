import { Component } from '@angular/core';

@Component({
  selector: 'app-status-line',
  templateUrl: './status-line.component.html',
  styleUrls: ['./status-line.component.scss']
})
export class StatusLineComponent {
  statuses = [
    {
      name: 'PLACED',
      type: 'DEFAULT'
    },
    {
      name: 'EXPIRED',
      type: 'ERROR'
    },
    {
      name: 'ABANDONED',
      type: 'ERROR'
    },
    {
      name: 'REJECTED',
      type: 'ERROR'
    },
    {
      name: 'ACCEPTED',
      type: 'DEFAULT'
    },
    {
      name: 'CANDELED',
      type: 'ERROR'
    },
    {
      name: 'PLACED',
      type: 'SERVED'
    }
  ]

  lineWidth = 0;

  constructor() {
  }
}
