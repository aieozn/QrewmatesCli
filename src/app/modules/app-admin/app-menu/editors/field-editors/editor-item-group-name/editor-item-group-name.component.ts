import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-editor-item-group-name',
  templateUrl: './editor-item-group-name.component.html',
  styleUrls: ['./editor-item-group-name.component.scss', '../common/field-editor.scss']
})
export class EditorItemGroupNameComponent {
  @Input('name')
  elementNameFormControl : FormControl<string | null> | undefined;
}
