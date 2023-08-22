import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule} from '@angular/material/table';

import { AppHistoryRoutingModule } from './app-history-routing.module';
import { AdminHistoryComponent } from './admin-history.component';
import { ComplexEditorModule } from 'app/common/complex-editor/complex-editor.module';
import { OrderDetialsPageComponent } from './order-detials-page/order-detials-page.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { OrderComposerModule } from '@common/order-composer/order-composer.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    AdminHistoryComponent,
    OrderDetialsPageComponent
  ],
  imports: [
    CommonModule,
    AppHistoryRoutingModule,
    MatTableModule,
    MatSortModule,
    OrderComposerModule,
    ComplexEditorModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ]
})
export class AppHistoryModule { }
