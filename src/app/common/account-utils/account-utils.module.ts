import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountIconComponent } from './layout/account-icon/account-icon.component';
import { AccountBarComponent } from './layout/account-bar/account-bar.component';

@NgModule({
  declarations: [
    AccountIconComponent,
    AccountBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AccountIconComponent,
    AccountBarComponent
  ]
})
export class AccountUtilsModule { }
