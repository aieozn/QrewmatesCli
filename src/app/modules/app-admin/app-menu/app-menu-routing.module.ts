import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMenuCategoriesComponent } from './admin-menu-categories/admin-menu-categories.component';
import { AdminMenuCategoryComponent } from './admin-menu-category/admin-menu-category.component';
import { EditCategoryComponent } from './editors/edit-category/edit-category.component';
import { EditItemGroupComponent } from './editors/edit-item-group/edit-item-group.component';
import { EditItemComponent } from './editors/edit-item/edit-item.component';
import { EditItemSelectsComponent } from './editors/edit-item/edit-item-selects/edit-item-selects.component';
import { EditItemToppingsComponent } from './editors/edit-item/edit-item-toppings/edit-item-toppings.component';
import { EditItemSettingsComponent } from './editors/edit-item/edit-item-settings/edit-item-settings.component';
import { EditItemGroupAggregateSettingsComponent } from './editors/edit-item-group-aggregate/edit-item-group-aggregate-settings/edit-item-group-aggregate-settings.component';
import { EditItemGroupAggregateComponent } from './editors/edit-item-group-aggregate/edit-item-group-aggregate.component';
import { AdminMenuAllergensComponent } from './admin-menu-allergens/admin-menu-allergens.component';
import { EditAllergenComponent } from './editors/edit-allergen/edit-allergen.component';
import { AdminMenuSelectCollectionsComponent } from './admin-menu-select-collections/admin-menu-select-collections.component';
import { EditSelectCollectionComponent } from './editors/edit-select-collection/edit-select-collection.component';
import { EditAllergensComponent } from './editors/edit-allergens/edit-allergens.component';
import { EditSelectComponent } from './editors/edit-select/edit-select.component';
import { EditSelectSettingsComponent } from './editors/edit-select/edit-select-settings/edit-select-settings.component';
import { AdminMenuToppingCollectionsComponent } from './admin-menu-topping-collections/admin-menu-topping-collections.component';
import { EditToppingCollectionComponent } from './editors/edit-topping-collection/edit-topping-collection.component';
import { EditToppingComponent } from './editors/edit-topping/edit-topping.component';
import { EditToppingSettingsComponent } from './editors/edit-topping/edit-topping-settings/edit-topping-settings.component';

const editItemRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'settings'
  },
  {
    path: 'allergens',
    component: EditAllergensComponent
  },
  {
    path: 'selects',
    component: EditItemSelectsComponent
  },
  {
    path: 'toppings',
    component: EditItemToppingsComponent
  },
  {
    path: 'settings',
    component: EditItemSettingsComponent
  }
]

const editGroupAggregateRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'settings'
  },
  {
    path: 'allergens',
    component: EditAllergensComponent
  },
  {
    path: 'selects',
    component: EditItemSelectsComponent
  },
  {
    path: 'toppings',
    component: EditItemToppingsComponent
  },
  {
    path: 'settings',
    component: EditItemGroupAggregateSettingsComponent
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
    path: 'allergens',
    component: AdminMenuAllergensComponent,
    children: [
      {
        path: 'create',
        component: EditAllergenComponent
      },
      {
        path: ':ellergenRef/edit',
        component: EditAllergenComponent
      }
    ]
  },
  {
    path: 'select-collections',
    component: AdminMenuSelectCollectionsComponent,
    children: [
      {
        path: 'create',
        component: EditSelectCollectionComponent
      }
    ]
  },
  {
    path: 'select-collections/:selectCollectionRef',
    component: AdminMenuSelectCollectionsComponent,
    children: [
      {
        path: 'edit',
        component: EditSelectCollectionComponent
      },
      {
        path: 'select/create',
        component: EditSelectComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'settings'
          },
          {
            path: 'settings',
            component: EditSelectSettingsComponent
          },
          {
            path: 'allergens',
            component: EditAllergensComponent
          }
        ]
      },
      {
        path: 'select/:selectRef/edit',
        component: EditSelectComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'settings'
          },
          {
            path: 'settings',
            component: EditSelectSettingsComponent
          },
          {
            path: 'allergens',
            component: EditAllergensComponent
          }
        ]
      },
    ]
  },
  {
    path: 'topping-collections',
    component: AdminMenuToppingCollectionsComponent,
    children: [
      {
        path: 'create',
        component: EditToppingCollectionComponent
      }
    ]
  },
  {
    path: 'topping-collections/:toppingCollectionRef',
    component: AdminMenuToppingCollectionsComponent,
    children: [
      {
        path: 'edit',
        component: EditToppingCollectionComponent
      },
      {
        path: 'topping/create',
        component: EditToppingComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'settings'
          },
          {
            path: 'settings',
            component: EditToppingSettingsComponent
          },
          {
            path: 'allergens',
            component: EditAllergensComponent
          }
        ]
      },
      {
        path: 'topping/:toppingRef/edit',
        component: EditToppingComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'settings'
          },
          {
            path: 'settings',
            component: EditToppingSettingsComponent
          },
          {
            path: 'allergens',
            component: EditAllergensComponent
          }
        ]
      },
    ]
  },
  {
    path: 'category/:categoryRef',
    component: AdminMenuCategoryComponent,
    children: [
      {
        path: 'group-aggregate/create',
        component: EditItemGroupAggregateComponent,
        children: editGroupAggregateRoutes
      },
      {
        path: 'group-aggregate/:menuItemGroupRef/edit',
        component: EditItemGroupAggregateComponent,
        children: editGroupAggregateRoutes
      },
    ]
  },
  {
    path: 'category/:categoryRef/group/:menuItemGroupRef',
    component: AdminMenuCategoryComponent,
    children: [
      {
        path: 'edit',
        component: EditItemGroupComponent
      },
      {
        path: 'item/:menuItemRef/edit',
        component: EditItemComponent,
        children: editItemRoutes
      },
      {
        path: 'item/create',
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
