import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-editor-form-text',
  templateUrl: './editor-form-text.component.html',
  styleUrls: ['../common/field-editor.scss', './editor-form-text.component.scss']
})
export class EditorFormTextComponent {
  @Input('control')
  control : FormControl<string | null> | undefined;

  @Input('name')
  name : string | undefined;
}
