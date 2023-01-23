import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuCliComponent } from './menu-cli/layout/menu-cli.component';
import { MenuStaffComponent } from './menu-staff/layout/menu-staff.component';

const routes: Routes = [
  // TODO maybe use short url proxy to redirect
  { path: 'menu/:restaurantRef/:tableRef', component: MenuCliComponent },
  { path: 'staff', component: MenuStaffComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
