import { EventEmitter, Injectable } from '@angular/core';
import { MenuCategoryGet, MenuItemGroupGet } from '@common/api-client/models';

@Injectable({
  providedIn: 'root'
})
export class EditorDialogService {

  public onCloseDialog = new EventEmitter<void>();
  public onCategoryCreated = new EventEmitter<MenuCategoryGet>();
  public onCategoryUpdated = new EventEmitter<MenuCategoryGet>();
  public onCategoryDeleted = new EventEmitter<string>();

  public onItemGroupUpdated = new EventEmitter<MenuItemGroupGet>();
  public onItemGroupDeleted = new EventEmitter<string>();

  public closeDialog() {
    this.onCloseDialog.emit();
  }

  public categoryCreated(category: MenuCategoryGet) {
    this.onCategoryCreated.emit(category);
  }

  public categoryUpdated(category: MenuCategoryGet) {
    this.onCategoryUpdated.emit(category);
  }

  public categoryDeleted(ref: string) {
    this.onCategoryDeleted.emit(ref)
  }

  public itemGroupDeleted(ref: string) {
    this.onItemGroupDeleted.emit(ref)
  }

  public itemGroupUpdated(itemGroup: MenuItemGroupGet) {
    this.onItemGroupUpdated.emit(itemGroup);
  }
}
