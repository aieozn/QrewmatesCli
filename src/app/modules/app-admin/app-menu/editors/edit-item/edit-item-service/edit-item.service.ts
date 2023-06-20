import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuItemExtendedData } from './menu-item-extended-data';
import { MenuItemGroupGet } from '@common/api-client/models';

@Injectable({
  providedIn: 'root'
})
export class EditItemService {
  private itemData: BehaviorSubject<MenuItemExtendedData | undefined> = new BehaviorSubject<MenuItemExtendedData | undefined>(undefined);
  
  private isValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  onSaveTry = new EventEmitter<void>();
  private isUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  errors = new Set<string>()

  public addError(name: string) {
    this.errors.add(name);
    this.isValid.next(false)
  }

  public removeError(name: string) {
    this.errors.delete(name);
    this.isValid.next(this.errors.size === 0);
  }

  public clearErrors() {
    this.errors.clear();
    this.isValid.next(true);
  }

  public observeItemData(): Observable<MenuItemExtendedData | undefined> {
    return this.itemData;
  }

  public getItemData(): MenuItemExtendedData {
    const value = this.itemData.getValue();

    if (value === undefined) {
      throw 'Item data is not set';
    } else {
      return value;
    }
  }

  public update(data: MenuItemExtendedData) {
    this.isUpdated.next(true);
    this.itemData.next(data);
  }

  public clearWithValue(data: MenuItemExtendedData) {
    this.isUpdated.next(false);
    this.itemData.next(data);
  }

  public clear(group: MenuItemGroupGet | undefined) {
    this.itemData.next({
      name: '',
      price: undefined,
      selectCollections: [],
      toppingCollections: [],
      available: true,
      menuItemGroupRef: group ? group.ref : '',
      menuItemGroupName: group ? group.name : ''
    });
  }

  public valid(): Observable<boolean> {
    return this.isValid;
  }

  public updated(): Observable<boolean> {
    return this.isUpdated;
  }
}
