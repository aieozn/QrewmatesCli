import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-wrapper';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-order-submit',
  templateUrl: './order-submit.component.html',
  styleUrls: ['./order-submit.component.scss']
})
export class OrdeSubmitComponent implements OnInit, OnDestroy {

  orderUpdatedSubscription: Subscription;
  price: number = 0;
  itemsCount: number = 0;

  // Set to true if the order should be submited when button is clicked
  // otherwise, the summary component will be displayed
  // @Input('final') final: boolean = false;

  @Output('submit') submit = new EventEmitter<void>();

  constructor(private orderService: OrderService) {
    this.orderUpdatedSubscription = orderService.orderChanged.subscribe(this.onOrderUpdate.bind(this))
    this.onOrderUpdate(orderService.getOrder());
  }
  
  ngOnDestroy(): void {
    this.orderUpdatedSubscription.unsubscribe();
  }

  public onOrderUpdate(order: OrderWrapper) {
    this.price = order.price
    this.itemsCount = order.items.length;
  }

  ngOnInit(): void {
    console.log("Open submit");
  }

  proceed() {
    this.submit.emit();
    // TODO fix making order
    // if (!this.final) {
    //   this.dialogService.openSummary();
    // } else {
    //   this.doOrder();
    // }
  }

  private doOrder() {
    // this.orderService.submit();
    // this.dialogService.closeMenuCliDialog();
  }

}
