import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuCliComponent } from './menu-cli/layout/menu-cli.component';
import { MenuStaffComponent } from './menu-waiter/layout/menu-staff/menu-staff.component';

const routes: Routes = [
  // TODO maybe use short url proxy to redirect
  { path: 'menu/:restaurantRef', component: MenuCliComponent },
  { path: 'staff', component: MenuStaffComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
