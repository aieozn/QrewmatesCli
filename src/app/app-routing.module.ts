import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHistoryComponent } from './menu-admin/layout/admin-history/admin-history.component';
import { AdminMenuComponent } from './menu-admin/layout/admin-menu/admin-menu.component';
import { AdminOrdersComponent } from './menu-admin/layout/admin-orders/admin-orders.component';
import { AdminStatisticsComponent } from './menu-admin/layout/admin-statistics/admin-statistics.component';
import { AdminTeamComponent } from './menu-admin/layout/admin-team/admin-team.component';
import { MenuAdminComponent } from './menu-admin/layout/menu-admin.component';
import { MenuCliComponent } from './menu-cli/layout/menu-cli.component';
import { MenuStaffComponent } from './menu-staff/layout/menu-staff.component';

const routes: Routes = [
  // TODO maybe use short url proxy to redirect
  { 
    path: 'menu/:restaurantRef/:tableRef',
    component: MenuCliComponent 
  },
  { 
    path: 'staff',
    component: MenuStaffComponent
  },
  { 
    path: 'admin',
    component: MenuAdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'statistics',
        pathMatch: 'full'
      },
      {
        path: 'statistics',
        component: AdminStatisticsComponent
      },
      {
        path: 'orders',
        component: AdminOrdersComponent
      },
      {
        path: 'menu',
        component: AdminMenuComponent
      },
      {
        path: 'history',
        component: AdminHistoryComponent
      },
      {
        path: 'team',
        component: AdminTeamComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
