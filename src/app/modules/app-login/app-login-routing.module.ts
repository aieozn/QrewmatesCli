import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectOrganizationComponent } from './layout/select-organization/select-organization.component';
import { LoginPageComponent } from './login-page.component';

const routes: Routes = [
  {
    path: 'select-organization',
    component: SelectOrganizationComponent
  },
  { 
    path: ':secret',
    component: LoginPageComponent
  },
  { 
    path: '',
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLoginRoutingModule { }
