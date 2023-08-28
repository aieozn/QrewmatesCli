import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-editor-radio',
  templateUrl: './editor-radio.component.html',
  styleUrls: ['./editor-radio.component.scss']
})
export class EditorRadioComponent {

  @Input('control')
  control : FormControl<string | null> | undefined;

  @Input('options')
  options : {
    key: string,
    value: string
  }[] | undefined;

  @Input('name')
  name : string | undefined;

  @Input('prefix')
  prefix : string | undefined;
}
