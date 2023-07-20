import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHistoryComponent } from './admin-history.component';
import { OrderDetialsPageComponent } from './order-detials-page/order-detials-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminHistoryComponent,
    children: [
      {
        path: ':orderRef',
        component: OrderDetialsPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppHistoryRoutingModule { }
