import { EventEmitter, Injectable } from '@angular/core';
import { MenuCategoryGet } from 'src/app/openapi-cli/models';

@Injectable({
  providedIn: 'root'
})
export class EditorDialogService {

  public onCloseDialog = new EventEmitter<void>();
  public onCategoryCreated = new EventEmitter<MenuCategoryGet>();
  public onCategoryUpdated = new EventEmitter<MenuCategoryGet>();

  constructor() { }

  public closeDialog() {
    this.onCloseDialog.emit();
  }

  public categoryCreated(category: MenuCategoryGet) {
    this.onCategoryCreated.emit(category);
  }

  public categoryUpdated(category: MenuCategoryGet) {
    this.onCategoryUpdated.emit(category);
  }
}
