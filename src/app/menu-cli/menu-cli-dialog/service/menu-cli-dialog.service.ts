import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuCliDialogService {

  public openMenuDialog = new EventEmitter<any>();

  constructor() { }

  public openMenu() {
    this.openMenuDialog.emit();
  }
}
