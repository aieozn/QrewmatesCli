import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRegistrationRoutingModule } from './app-registration-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InvitationFormComponent } from './invitation-form/invitation-form.component';


@NgModule({
  declarations: [
    RegistrationComponent,
    NotFoundComponent,
    InvitationFormComponent
  ],
  imports: [
    CommonModule,
    AppRegistrationRoutingModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule
  ]
})
export class AppRegistrationModule { }
