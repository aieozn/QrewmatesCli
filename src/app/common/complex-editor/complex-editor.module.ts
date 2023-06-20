import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplexEditorWrapperComponent } from './complex-editor-wrapper/complex-editor-wrapper.component';
import { SubmitBarComponent } from './submit-bar/submit-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { EditorFormTextComponent } from './field-editors/editor-form-text/editor-form-text.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditorImageComponent } from './field-editors/editor-image/editor-image.component';
import { EditorPriceComponent } from './field-editors/editor-price/editor-price.component';



@NgModule({
  declarations: [
    ComplexEditorWrapperComponent,
    SubmitBarComponent,
    EditorFormTextComponent,
    EditorImageComponent,
    EditorPriceComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule
  ],
  exports: [
    ComplexEditorWrapperComponent,
    EditorFormTextComponent,
    EditorImageComponent,
    EditorPriceComponent
  ]
})
export class ComplexEditorModule { }
