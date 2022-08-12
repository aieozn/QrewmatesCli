import { Component, Input, OnInit } from '@angular/core';
import { MenuCliDialogService } from 'src/app/menu-cli/menu-cli-dialog/service/menu-cli-dialog.service';
import { OrderService } from 'src/app/menu-cli/services/order/order.service';
import { OrderElementDataWrapper } from 'src/app/openapi-cli-wrapper/order/order-element-data-wrapper';

@Component({
  selector: 'app-counter-footer',
  templateUrl: './counter-footer.component.html',
  styleUrls: ['./counter-footer.component.scss']
})
export class CounterFooterComponent implements OnInit {

  @Input('order') order!: OrderElementDataWrapper;

  count = 1;

  constructor(private orderService: OrderService, private dialogService: MenuCliDialogService) { }

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
    for (var i = 0; i < this.count; i++) {
      this.orderService.addOrderElement(this.order);
    }
    
    this.dialogService.closeAddItem();
  }

}
