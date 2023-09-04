import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { InvitationFormComponent } from './invitation-form/invitation-form.component';

const routes: Routes = [
  {
    path: 'register/:secret',
    component: RegistrationComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: 'invitation/:secret',
    component: InvitationFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRegistrationRoutingModule { }
