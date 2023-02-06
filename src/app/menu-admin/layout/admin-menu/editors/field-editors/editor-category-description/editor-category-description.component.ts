import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-editor-category-description',
  templateUrl: './editor-category-description.component.html',
  styleUrls: ['./editor-category-description.component.scss', '../common/field-editor.scss']
})
export class EditorCategoryDescriptionComponent {
  @Input('desciprion')
  categoryDescriptionFormControl : FormControl<string | null> | undefined;
}
