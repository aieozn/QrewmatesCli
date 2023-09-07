import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppAdminRoutingModule } from './app-admin-routing.module';
import { AccountUtilsModule } from '@common/account-utils/account-utils.module';
import { MenuAdminComponent } from './layout/menu-admin.component';
import { HeaderBarComponent } from './layout/header-bar/header-bar.component';


@NgModule({
  declarations: [
    MenuAdminComponent,
    HeaderBarComponent
  ],
  imports: [
    CommonModule,
    AppAdminRoutingModule,
    AccountUtilsModule
  ],
  providers: [
  ],
  bootstrap: [MenuAdminComponent]
})
export class AppAdminModule { }
