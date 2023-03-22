import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'statistics',
    pathMatch: 'full'
  },
  {
    path: 'statistics',
    loadChildren: () => import('./app-statistics/admin-statistics.component').then(m => m.AdminStatisticsComponent)
  },
  {
    path: 'orders',
    loadChildren: () => import('./app-orders/app-orders.module').then(m => m.AppOrdersModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./app-menu/app-menu.module').then(m => m.AppMenuModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./app-history/app-history.module').then(m => m.AppHistoryModule)
  },
  {
    path: 'team',
    loadChildren: () => import('./app-team/app-team.module').then(m => m.AppTeamModule)
  },
  {
    path: 'customization',
    loadChildren: () => import('./app-customization/app-customization.module').then(m => m.AppCustomizationModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAdminRoutingModule { }
