import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MenuCliComponent } from './layout/menu-cli/menu-cli.component';

const routes: Routes = [
  { path: ':restaurantRef', component: MenuCliComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
