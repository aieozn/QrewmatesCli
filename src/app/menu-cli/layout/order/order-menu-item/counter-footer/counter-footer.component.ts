import { Component, Input, OnInit } from '@angular/core';
import { OrderElementDataWrapper } from 'src/app/openapi-cli-wrapper/order/order-element-data-wrapper';

@Component({
  selector: 'app-counter-footer',
  templateUrl: './counter-footer.component.html',
  styleUrls: ['./counter-footer.component.scss']
})
export class CounterFooterComponent implements OnInit {

  @Input('order') order!: OrderElementDataWrapper;

  count = 1;

  constructor() { }

  ngOnInit(): void {
  }

  itemAdd() {
    this.count += 1;
  }

  // TODO przyciski rozszerzają się po zmianie wartości
  itemSubstract() {
    this.count -= 1;
  }

}
