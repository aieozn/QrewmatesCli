import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTeamComponent } from './admin-team.component';
import { UserEditorComponent } from './editors/user-editor/user-editor.component';

const routes: Routes = [
  {
    path: '',
    component: AdminTeamComponent,
    children: [
      {
        path: 'user/:userRef/edit',
        component: UserEditorComponent
      },
      {
        path: 'user/create',
        component: UserEditorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppTeamRoutingModule { }
