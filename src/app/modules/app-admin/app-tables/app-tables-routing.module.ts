import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTablesComponent } from './admin-tables/admin-tables.component';
import { EditTableComponent } from './editors/edit-table/edit-table.component';

const routes: Routes = [
  {
    path: '',
    component: AdminTablesComponent,
    children: [
      {
        path: 'table/:tableRef',
        component: EditTableComponent
      },
      {
        path: 'create',
        component: EditTableComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppTablesRoutingModule { }
