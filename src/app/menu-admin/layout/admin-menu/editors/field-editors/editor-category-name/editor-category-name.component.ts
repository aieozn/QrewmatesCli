import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-editor-category-name',
  templateUrl: './editor-category-name.component.html',
  styleUrls: ['./editor-category-name.component.scss', '../common/field-editor.scss']
})
export class EditorCategoryNameComponent {
  @Input('name')
  elementNameFormControl : FormControl<string | null> | undefined;
}
