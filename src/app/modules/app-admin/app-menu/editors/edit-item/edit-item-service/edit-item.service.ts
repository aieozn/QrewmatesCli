import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItemExtendedData } from './menu-item-extended-data';

@Injectable({
  providedIn: 'root'
})
export class EditItemService {
  itemData: BehaviorSubject<MenuItemExtendedData | undefined> = new BehaviorSubject<MenuItemExtendedData | undefined>(undefined);
  
  isValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  onSaveTry = new EventEmitter<void>();
  isUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
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
}
