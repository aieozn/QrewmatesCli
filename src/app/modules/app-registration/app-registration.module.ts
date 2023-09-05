import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRegistrationRoutingModule } from './app-registration-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InvitationFormComponent } from './invitation-form/invitation-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';


@NgModule({
  declarations: [
    RegistrationComponent,
    NotFoundComponent,
    InvitationFormComponent,
    ConfirmEmailComponent
  ],
  imports: [
    CommonModule,
    AppRegistrationRoutingModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ]
})
export class AppRegistrationModule { }
