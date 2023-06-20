import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-editor',
  templateUrl: './generic-editor.component.html',
  styleUrls: ['./generic-editor.component.scss']
})
export class GenericEditorComponent {
  @Input('name')
  name : string | undefined;

  @Input('subtitile')
  subtitle : string | undefined;
}
