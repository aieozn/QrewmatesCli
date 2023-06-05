import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuItemExtendedData } from './menu-item-extended-data';

@Injectable({
  providedIn: 'root'
})
export class EditItemService {
  private itemData: BehaviorSubject<MenuItemExtendedData | undefined> = new BehaviorSubject<MenuItemExtendedData | undefined>(undefined);
  
  private isValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  onSaveTry = new EventEmitter<void>();
  private isUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  errors: string[] = [];

  public addError(name: string) {
    this.errors.push(name);
    this.isValid.next(false)
  }

  public removeError(name: string) {
    this.errors = this.errors.filter(e => e !== name);
    this.isValid.next(this.errors.length == 0);
  }

  public clearErrors() {
    this.errors = [];
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

  public updateItem(data: MenuItemExtendedData) {
    this.itemData.next(data);
    this.isUpdated.next(true);
  }
}
