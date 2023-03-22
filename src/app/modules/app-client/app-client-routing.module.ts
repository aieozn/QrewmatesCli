import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppClientComponent } from './layout/app-client.component';

const routes: Routes = [
  { 
    path: ':restaurantRef/:tableRef',
    component: AppClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppClientRoutingModule {
  
}
