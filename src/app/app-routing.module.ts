import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // TODO maybe use short url proxy to redirect
  { 
    path: 'menu',
    loadChildren: () => import('./modules/app-client/app-client.module').then(m => m.AppClientModule) 
  },
  { 
    path: 'login',
    loadChildren: () => import('./modules/app-login/app-login.module').then(m => m.AppLoginModule) 
  },
  { 
    path: 'staff',
    loadChildren: () => import('./modules/app-staff/app-staff.module').then(m => m.AppStaffModule)
  },
  { 
    path: 'admin',
    loadChildren: () => import('./modules/app-admin/app-admin.module').then(m => m.AppAdminModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
