import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppTeamRoutingModule } from './app-team-routing.module';
import { AdminTeamComponent } from './admin-team.component';


@NgModule({
  declarations: [
    AdminTeamComponent
  ],
  imports: [
    CommonModule,
    AppTeamRoutingModule
  ]
})
export class AppTeamModule { }
