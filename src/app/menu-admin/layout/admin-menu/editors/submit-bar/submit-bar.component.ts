import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-submit-bar',
  templateUrl: './submit-bar.component.html',
  styleUrls: ['./submit-bar.component.scss']
})
export class SubmitBarComponent {
  @Input('saveEnabled') saveEnabled = false;

  @Output('onClose')
  onClose = new EventEmitter<void>();

  @Output('onSave')
  onSave = new EventEmitter<void>();

  public closeDialog() {
    this.onClose.emit();
  }

  public saveElement() {
    this.onSave.emit();
  }
}
