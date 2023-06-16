import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTablesComponent } from './admin-tables/admin-tables.component';

const routes: Routes = [
  {
    path: '',
    component: AdminTablesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppTablesRoutingModule { }
