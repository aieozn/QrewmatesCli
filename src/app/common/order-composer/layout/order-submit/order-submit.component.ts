import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { OrderWrapper } from 'src/app/common/api-client/wrapper/order-wrapper';

@Component({
  selector: 'app-order-submit',
  templateUrl: './order-submit.component.html',
  styleUrls: ['./order-submit.component.scss']
})
export class OrdeSubmitComponent implements OnInit {
  // Set to true if the order should be submited when button is clicked
  // otherwise, the summary component will be displayed
  // @Input('final') final: boolean = false;

  @Output('submit') submit = new EventEmitter<void>();

  @Input('order') order: OrderWrapper | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  proceed() {
    this.submit.emit();
  }
}
