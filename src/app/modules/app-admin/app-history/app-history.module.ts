import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule} from '@angular/material/table';

import { AppHistoryRoutingModule } from './app-history-routing.module';
import { AdminHistoryComponent } from './admin-history.component';
import { ComplexEditorModule } from 'app/common/complex-editor/complex-editor.module';
import { OrderDetialsPageComponent } from './order-detials-page/order-detials-page.component';
import { OrderComposerModule } from '@common/order-composer/order-composer.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DateRangePickerModule } from 'app/common/components/date-range-picker/date-range-picker.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';


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
    DateRangePickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  providers: [
    MatNativeDateModule
  ]
})
export class AppHistoryModule { }
