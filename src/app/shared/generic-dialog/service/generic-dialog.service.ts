import { EventEmitter, Injectable } from '@angular/core';
import { DialogBodyItem } from '../model/dialog-body-item';

@Injectable({
  providedIn: 'root'
})
export class GenericDialogService {

  public openMenuDialog = new EventEmitter<DialogBodyItem>();
  public closeMenuDialog = new EventEmitter<void>();

  constructor() { }

  public closeMenuCliDialog() {
    this.closeMenuDialog.emit();
  }
}
