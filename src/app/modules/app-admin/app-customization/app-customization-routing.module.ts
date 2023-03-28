import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCustomizationComponent } from './admin-customization.component';

const routes: Routes = [
  {
    path: '',
    component: AdminCustomizationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppCustomizationRoutingModule { }
