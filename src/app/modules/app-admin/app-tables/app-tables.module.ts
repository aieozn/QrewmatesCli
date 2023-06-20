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
import { ComplexEditorModule } from 'app/common/complex-editor/complex-editor.module';
import { EditTableComponent } from './editors/edit-table/edit-table.component';
import { EditorTableQrComponent } from './editors/field-editors/editor-table-qr/editor-table-qr.component';


@NgModule({
  declarations: [
    AdminTablesComponent,
    EditTableComponent,
    EditorTableQrComponent
  ],
  imports: [
    CommonModule,
    AppTablesRoutingModule,
    HallModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ComplexEditorModule
  ]
})
export class AppTablesModule { }
