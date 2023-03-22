import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-editor-item-group-description',
  templateUrl: './editor-item-group-description.component.html',
  styleUrls: ['./editor-item-group-description.component.scss', '../common/field-editor.scss']
})
export class EditorItemGroupDescriptionComponent {
  @Input('desciprion')
  elementDescriptionFormControl : FormControl<string | null> | undefined;
}
