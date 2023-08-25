import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppTeamRoutingModule } from './app-team-routing.module';
import { AdminTeamComponent } from './admin-team.component';
import { UserBarComponent } from './user-bar/user-bar.component';
import { UserPermissionsPipe } from './filters/users-permissions-pipe';
import { AccountUtilsModule } from '@common/account-utils/account-utils.module';
import { MatIconModule } from '@angular/material/icon';
import { UserEditorComponent } from './editors/user-editor/user-editor.component';
import { ComplexEditorModule } from 'app/common/complex-editor/complex-editor.module';


@NgModule({
  declarations: [
    AdminTeamComponent,
    UserBarComponent,
    UserPermissionsPipe,
    UserEditorComponent
  ],
  imports: [
    CommonModule,
    AppTeamRoutingModule,
    AccountUtilsModule,
    MatIconModule,
    ComplexEditorModule
  ]
})
export class AppTeamModule { }
