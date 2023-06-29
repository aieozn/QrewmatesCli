import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditOrderComponent } from './edit-order/edit-order.component';

const routes: Routes = [
  // TODO maybe use short url proxy to redirect
  { 
    path: ':orderRef',
    component: EditOrderComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppEditOrdersRoutingModule { }
