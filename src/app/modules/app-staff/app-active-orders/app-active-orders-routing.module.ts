import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppStaffComponent } from './layout/app-staff.component';

const routes: Routes = [
  // TODO maybe use short url proxy to redirect
  { 
    path: '',
    component: AppStaffComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppActiveOrdersRoutingModule { }
