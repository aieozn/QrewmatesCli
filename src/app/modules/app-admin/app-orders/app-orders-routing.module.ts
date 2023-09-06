import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOrdersComponent } from './admin-orders.component';
import { EditOrderDialogComponent } from './order-details-dialog/order-details-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: AdminOrdersComponent,
    children: [
      {
        path: 'edit/:orderRef',
        component: EditOrderDialogComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AppOrdersRoutingModule { }
