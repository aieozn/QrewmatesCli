import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderElementDataWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-element-data-wrapper';
import { GenericDialogService } from 'src/app/shared/generic-dialog/service/generic-dialog.service';

@Component({
  selector: 'app-counter-footer',
  templateUrl: './counter-footer.component.html',
  styleUrls: ['./counter-footer.component.scss']
})
export class CounterFooterComponent implements OnInit {

  @Input('order') order: OrderElementDataWrapper | undefined;
  @Output('submit') submit = new EventEmitter<OrderElementDataWrapper[]>;

  count = 1;

  constructor(private dialogService: GenericDialogService) { }

  ngOnInit(): void {
  }

  itemAdd() {
    this.count += 1;
  }

  // TODO przyciski rozszerzają się po zmianie wartości
  itemSubstract() {
    this.count = Math.max(0, this.count - 1);

    if (this.count === 0) {
      this.submit.emit([]);
    }
  }

  subscribeItem() {
    if (this.order) {
      let allElements: OrderElementDataWrapper[] = [];

      for (var i = 0; i < this.count; i++) {
        allElements.push(this.order);
      }

      this.submit.emit(allElements);
    } else {
      console.error("Order is not initialized yet")
    }
  }

}
