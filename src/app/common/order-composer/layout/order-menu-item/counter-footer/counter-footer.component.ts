import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderElementDataWrapper } from '@common/api-client/wrapper/order-element-data-wrapper';
import { FullWidthDialogService } from '@common/full-width-dialog/service/full-width-dialog.service';

@Component({
  selector: 'app-counter-footer',
  templateUrl: './counter-footer.component.html',
  styleUrls: ['./counter-footer.component.scss']
})
export class CounterFooterComponent {

  @Input('order') order: OrderElementDataWrapper | undefined;
  @Input('editMode') editMode = false;
  @Output('submit') submit = new EventEmitter<OrderElementDataWrapper[]>;

  count = 1;

  constructor(private dialogService: FullWidthDialogService) { }

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
      const allElements: OrderElementDataWrapper[] = [];

      for (let i = 0; i < this.count; i++) {
        allElements.push(this.order);
      }

      this.submit.emit(allElements);
    } else {
      console.error("Order is not initialized yet")
    }
  }

}
