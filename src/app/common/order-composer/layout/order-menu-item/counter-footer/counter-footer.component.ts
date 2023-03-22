import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderElementDataWrapper } from 'src/app/common/api-client/wrapper/order-element-data-wrapper';
import { FullWidthDialogService } from 'src/app/common/full-width-dialog/service/full-width-dialog.service';

@Component({
  selector: 'app-counter-footer',
  templateUrl: './counter-footer.component.html',
  styleUrls: ['./counter-footer.component.scss']
})
export class CounterFooterComponent implements OnInit {

  @Input('order') order: OrderElementDataWrapper | undefined;
  @Input('editMode') editMode = false;
  @Output('submit') submit = new EventEmitter<OrderElementDataWrapper[]>;

  count = 1;

  constructor(private dialogService: FullWidthDialogService) { }

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
