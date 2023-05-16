import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMenuCategoriesComponent } from './admin-menu-categories/admin-menu-categories.component';
import { AdminMenuCategoryComponent } from './admin-menu-category/admin-menu-category.component';
import { EditCategoryComponent } from './editors/edit-category/edit-category.component';
import { EditItemGroupComponent } from './editors/edit-item-group/edit-item-group.component';

const routes: Routes = [
  {
    path: 'categories',
    component: AdminMenuCategoriesComponent,
    children: [
      {
        path: 'edit/:categoryRef',
        component: EditCategoryComponent
      }
    ]
  },
  {
    path: 'category/:categoryRef',
    component: AdminMenuCategoryComponent,
    children: [
      {
        path: 'edit/:menuItemGroupRef',
        component: EditItemGroupComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppMenuRoutingModule { }
