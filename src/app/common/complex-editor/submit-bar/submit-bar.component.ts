import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-submit-bar',
  templateUrl: './submit-bar.component.html',
  styleUrls: ['./submit-bar.component.scss']
})
export class SubmitBarComponent {
  @Input('saveEnabled') saveEnabled = false;
  @Input('showEditButton') showEditButton = true;
  @Input('deleteEnabled') deleteEnabled = false;
  @Input('cancelButtonText') cancelButtonText = $localize`Cancel`;
  @Input('detailsLink') detailsLink: string[] | undefined;

  @Output('onClose')
  onClose = new EventEmitter<void>();

  @Output('onSave')
  onSave = new EventEmitter<void>();

  @Output('onTrySave')
  onTrySave = new EventEmitter<void>();

  @Output('onDelete')
  onDelete = new EventEmitter<void>();

  closeDialog() {
    this.onClose.emit();
  }

  saveElement() {
    this.onSave.emit();
  }

  deleteElement() {
    this.onDelete.emit();
  }

  trySaveElement() {
    this.onTrySave.emit();
  }
}
