import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderActivePipe } from './order-active.pipe';
import { OrderAssigneePipe } from './order-assignee.pipe';
import { OrderStatusPipe } from './order-status.pipe';



@NgModule({
  declarations: [
    OrderActivePipe,
    OrderAssigneePipe,
    OrderStatusPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OrderActivePipe,
    OrderAssigneePipe,
    OrderStatusPipe
  ]
})
export class OrderPipeModule { }
