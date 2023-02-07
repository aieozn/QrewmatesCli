import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-editor-category-name',
  templateUrl: './editor-category-name.component.html',
  styleUrls: ['./editor-category-name.component.scss', '../common/field-editor.scss']
})
export class EditorCategoryNameComponent {
  @Input('name')
  elementNameFormControl : FormControl<string | null> | undefined;
}
