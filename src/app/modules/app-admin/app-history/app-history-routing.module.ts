import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHistoryComponent } from './admin-history.component';

const routes: Routes = [
  {
    path: '',
    component: AdminHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppHistoryRoutingModule { }
