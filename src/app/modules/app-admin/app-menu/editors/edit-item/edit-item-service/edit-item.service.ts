import { Injectable } from '@angular/core';
import { MenuItemData } from '@common/api-client/models';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditItemService {
  activeItem: BehaviorSubject<MenuItemData | undefined> = new BehaviorSubject<MenuItemData | undefined>(undefined);
  onUpdate = new Subject<void>();
}
