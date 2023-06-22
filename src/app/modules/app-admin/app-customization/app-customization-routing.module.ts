import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCustomizationComponent } from './admin-customization.component';
import { EditThemeComponent } from './editors/edit-theme/edit-theme.component';

const routes: Routes = [
  {
    path: '',
    component: AdminCustomizationComponent,
    children: [
      {
        path: 'theme',
        component: EditThemeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppCustomizationRoutingModule { }
