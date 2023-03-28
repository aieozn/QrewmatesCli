import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTeamComponent } from './admin-team.component';

const routes: Routes = [
  {
    path: '',
    component: AdminTeamComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppTeamRoutingModule { }
