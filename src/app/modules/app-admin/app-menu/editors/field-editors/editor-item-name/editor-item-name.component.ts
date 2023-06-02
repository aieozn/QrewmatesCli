import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-editor-item-name',
  templateUrl: './editor-item-name.component.html',
  styleUrls: ['./editor-item-name.component.scss', '../common/field-editor.scss']
})
export class EditorItemNameComponent {
  @Input('name')
  elementNameFormControl : FormControl<string | null> | undefined;
}
