import { EventEmitter, Injectable } from '@angular/core';
import { MenuCategoryGet, MenuItemGet, MenuItemGroupGet } from '@common/api-client/models';

@Injectable({
  providedIn: 'root'
})
export class EditorDialogService {
  onCategoryCreated = new EventEmitter<MenuCategoryGet>();
  onCategoryUpdated = new EventEmitter<MenuCategoryGet>();
  onCategoryDeleted = new EventEmitter<string>();

  onItemGroupUpdated = new EventEmitter<MenuItemGroupGet>();
  onItemGroupDeleted = new EventEmitter<string>();

  onEditItem = new EventEmitter<MenuItemGet>();

  categoryCreated(category: MenuCategoryGet) {
    this.onCategoryCreated.emit(category);
  }

  categoryUpdated(category: MenuCategoryGet) {
    this.onCategoryUpdated.emit(category);
  }

  categoryDeleted(ref: string) {
    this.onCategoryDeleted.emit(ref)
  }

  itemGroupDeleted(ref: string) {
    this.onItemGroupDeleted.emit(ref)
  }

  itemGroupUpdated(itemGroup: MenuItemGroupGet) {
    this.onItemGroupUpdated.emit(itemGroup);
  }
}
