import { EventEmitter, Injectable } from '@angular/core';
import { MenuItemData } from '@common/api-client/models';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditItemService {
  activeItem: BehaviorSubject<MenuItemData | undefined> = new BehaviorSubject<MenuItemData | undefined>(undefined);
  isValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  onSaveTry = new EventEmitter<void>();
  onUpdate = new Subject<void>();
  private errors: string[] = [];

  public addError(name: string) {
    this.errors.push(name);
    this.isValid.next(false)
  }

  public removeError(name: string) {
    this.errors = this.errors.filter(e => e !== name);
    this.isValid.next(this.errors.length == 0);
  }
}
