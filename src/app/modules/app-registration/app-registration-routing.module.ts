import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { InvitationFormComponent } from './invitation-form/invitation-form.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';

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
  },
  {
    path: 'confirm/:secret',
    component: ConfirmEmailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRegistrationRoutingModule { }
