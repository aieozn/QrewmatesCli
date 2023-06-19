import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-complex-editor-wrapper',
  templateUrl: './complex-editor-wrapper.component.html',
  styleUrls: ['./complex-editor-wrapper.component.scss']
})
export class ComplexEditorWrapperComponent {
  @Input('headerEntry') headerEntry: string | undefined;
  @Input('headerValue') headerValue: string | undefined;

  @Input('saveEnabled') saveEnabled = false;
  @Input('deleteEnabled') deleteEnabled = false;
  @Input('detailsLink') detailsLink: string[] | undefined;

  @Input('tabs') tabs: {
    name: string,
    icon: string,
    routerLink: string
  }[] = []

  @Output('onClose')
  onClose = new EventEmitter<void>();

  @Output('onSave')
  onSave = new EventEmitter<void>();

  @Output('onTrySave')
  onTrySave = new EventEmitter<void>();

  @Output('onDelete')
  onDelete = new EventEmitter<void>();
}
