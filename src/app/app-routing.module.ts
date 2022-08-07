import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuCliComponent } from './menu-cli/layout/menu-cli.component';

const routes: Routes = [
  { path: ':restaurantRef', component: MenuCliComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
