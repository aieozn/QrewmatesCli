import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'active',
    loadChildren: () => import('./app-active-orders/app-active-orders.module').then(m => m.AppActiveOrdersModule) 
  },
  { 
    path: 'edit',
    loadChildren: () => import('./app-edit-order/app-edit-order.module').then(m => m.AppEditOrderModule) 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppStaffRoutingModule {
  
}
