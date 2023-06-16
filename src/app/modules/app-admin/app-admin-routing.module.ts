import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuAdminComponent } from './layout/menu-admin.component';

const routes: Routes = [
  {
    path: '',
    component: MenuAdminComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'statistics'
      },
      {
        path: 'statistics',
        loadChildren: () => import('./app-statistics/app-statistics.module').then(m => m.AppStatisticsModule)
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
      },
      {
        path: 'tables',
        loadChildren: () => import('./app-tables/app-tables.module').then(m => m.AppTablesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAdminRoutingModule { }
