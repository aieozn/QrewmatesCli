import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppTeamRoutingModule } from './app-team-routing.module';
import { AdminTeamComponent } from './admin-team.component';
import { UserBarComponent } from './user-bar/user-bar.component';
import { UserPermissionsPipe } from './filters/users-permissions-pipe';
import { AccountUtilsModule } from '@common/account-utils/account-utils.module';


@NgModule({
  declarations: [
    AdminTeamComponent,
    UserBarComponent,
    UserPermissionsPipe
  ],
  imports: [
    CommonModule,
    AppTeamRoutingModule,
    AccountUtilsModule
  ]
})
export class AppTeamModule { }
