import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditItemService } from '../edit-item/edit-item-service/edit-item.service';
@Component({
  selector: 'app-submit-bar',
  templateUrl: './submit-bar.component.html',
  styleUrls: ['./submit-bar.component.scss']
})
export class SubmitBarComponent {
  @Input('saveEnabled') saveEnabled = false;
  @Input('deleteEnabled') deleteEnabled = false;
  @Input('detailsLink') detailsLink: string[] | undefined;

  @Output('onClose')
  onClose = new EventEmitter<void>();

  @Output('onSave')
  onSave = new EventEmitter<void>();

  @Output('onDelete')
  onDelete = new EventEmitter<void>();

  constructor(private editorService: EditItemService) {

  }

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
    this.editorService.onSaveTry.emit();
  }
}
