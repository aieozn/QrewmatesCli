import { EventEmitter, Injectable } from '@angular/core';
import { MenuCategoryGet, MenuItemDetailedGet, MenuItemGroupGet } from '@common/api-client/models';

@Injectable({
  providedIn: 'root'
})
export class EditorDialogService {
  onCategoryCreated = new EventEmitter<MenuCategoryGet>();
  onCategoryUpdated = new EventEmitter<MenuCategoryGet>();
  onCategoryDeleted = new EventEmitter<string>();

  onItemGroupUpdated = new EventEmitter<MenuItemGroupGet>();
  onItemGroupCreated = new EventEmitter<MenuItemGroupGet>();
  onItemGroupDeleted = new EventEmitter<string>();

  onItemDeleted = new EventEmitter<{ref: string, groupRef: string, categoryRef: string}>();
  onItemUpdated = new EventEmitter<MenuItemDetailedGet>();
  onItemCreated = new EventEmitter<MenuItemDetailedGet>();
}
