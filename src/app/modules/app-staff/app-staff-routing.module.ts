import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppStaffComponent } from './layout/app-staff.component';

const routes: Routes = [
  { 
    path: '',
    component: AppStaffComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppStaffRoutingModule {
  
}
