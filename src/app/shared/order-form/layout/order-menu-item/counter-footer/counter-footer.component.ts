import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from 'src/app/menu-cli/services/order/order.service';
import { OrderElementDataWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-element-data-wrapper';
import { GenericDialogService } from 'src/app/shared/generic-dialog/service/generic-dialog.service';

@Component({
  selector: 'app-counter-footer',
  templateUrl: './counter-footer.component.html',
  styleUrls: ['./counter-footer.component.scss']
})
export class CounterFooterComponent implements OnInit {

  @Input('order') order: OrderElementDataWrapper | undefined;

  count = 1;

  constructor(private orderService: OrderService, private dialogService: GenericDialogService) { }

  ngOnInit(): void {
  }

  itemAdd() {
    this.count += 1;
  }

  // TODO przyciski rozszerzają się po zmianie wartości
  itemSubstract() {
    this.count = Math.max(1, this.count - 1);
  }

  subscribeItem() {
    if (this.order) {
      for (var i = 0; i < this.count; i++) {
        this.orderService.addOrderElement(this.order);
      }
      
      this.dialogService.closeMenuCliDialog();
    } else {
      console.error("Order is not initialized yet")
    }
  }

}