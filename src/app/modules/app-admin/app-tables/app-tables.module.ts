import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppTablesRoutingModule } from './app-tables-routing.module';
import { AdminTablesComponent } from './admin-tables/admin-tables.component';
import { HallModule } from 'app/common/hall/hall.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AdminTablesComponent
  ],
  imports: [
    CommonModule,
    AppTablesRoutingModule,
    HallModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule
  ]
})
export class AppTablesModule { }
