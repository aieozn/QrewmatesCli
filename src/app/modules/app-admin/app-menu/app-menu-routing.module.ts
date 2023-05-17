import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMenuCategoriesComponent } from './admin-menu-categories/admin-menu-categories.component';
import { AdminMenuCategoryComponent } from './admin-menu-category/admin-menu-category.component';
import { EditCategoryComponent } from './editors/edit-category/edit-category.component';
import { EditItemGroupComponent } from './editors/edit-item-group/edit-item-group.component';
import { EditItemComponent } from './editors/edit-item/edit-item.component';
import { AllergensComponent } from './editors/edit-item/allergens/allergens.component';
import { SelectsComponent } from './editors/edit-item/selects/selects.component';
import { ToppingsComponent } from './editors/edit-item/toppings/toppings.component';
import { SettingsComponent } from './editors/edit-item/settings/settings.component';

const editItemRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'selects'
  },
  {
    path: 'allergens',
    component: AllergensComponent
  },
  {
    path: 'selects',
    component: SelectsComponent
  },
  {
    path: 'toppings',
    component: ToppingsComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  }
]

const routes: Routes = [
  {
    path: 'categories',
    component: AdminMenuCategoriesComponent,
    children: [
      {
        path: 'category/:categoryRef/edit',
        component: EditCategoryComponent
      },
      {
        path: 'category/create',
        component: EditCategoryComponent
      }
    ]
  },
  {
    path: 'category/:categoryRef',
    component: AdminMenuCategoryComponent,
    children: [
      {
        path: 'group/:menuItemGroupRef/edit',
        component: EditItemGroupComponent
      },
      {
        path: 'group/create',
        component: EditItemGroupComponent
      },
      {
        path: 'group/:menuItemGroupRef/item/:menuItemRef/edit',
        component: EditItemComponent,
        children: editItemRoutes
      },
      {
        path: 'group/:menuItemGroupRef/item/create',
        component: EditItemComponent,
        children: editItemRoutes
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppMenuRoutingModule { }
