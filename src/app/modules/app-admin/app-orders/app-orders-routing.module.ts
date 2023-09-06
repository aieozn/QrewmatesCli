import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOrdersComponent } from './admin-orders.component';
import { OrderDetailsDialogComponent } from './order-details-dialog/order-details-dialog.component';
import { EditOrderComponent } from './edit-order/edit-order.component';

const routes: Routes = [
  {
    path: '',
    component: AdminOrdersComponent,
    children: [
      {
        path: 'details/:orderRef',
        component: OrderDetailsDialogComponent
      }
    ]
  },
  {
    path: 'edit/:orderRef',
    component: EditOrderComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AppOrdersRoutingModule { }
