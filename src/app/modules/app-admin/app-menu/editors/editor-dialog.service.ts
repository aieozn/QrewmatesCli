import { EventEmitter, Injectable } from '@angular/core';
import { AllergenGet, MenuCategoryGet, MenuItemDetailedGet, MenuItemGroupGet, MenuItemSelectCollectionGet, MenuItemSelectGet } from '@common/api-client/models';

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

  onAllergenDeleted = new EventEmitter<string>();
  onAllergenUpdated = new EventEmitter<AllergenGet>();
  onAllergenCreated = new EventEmitter<AllergenGet>();

  onSelectCollectionCreated = new EventEmitter<MenuItemSelectCollectionGet>();
  onSelectCollectionUpdated = new EventEmitter<MenuItemSelectCollectionGet>();
  onSelectCollectionDeleted = new EventEmitter<string>();

  onSelectCreated = new EventEmitter<MenuItemSelectGet>();
  onSelectUpdated = new EventEmitter<MenuItemSelectGet>();
  onSelectDeleted = new EventEmitter<string>();
}
