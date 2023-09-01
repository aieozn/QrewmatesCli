import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRegistrationRoutingModule } from './app-registration-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    RegistrationComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    AppRegistrationRoutingModule
  ]
})
export class AppRegistrationModule { }
