import { Injectable } from '@angular/core';
import { MenuItemDetailedGet } from '@common/api-client/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditItemService {
  activeItem: BehaviorSubject<MenuItemDetailedGet | undefined> = new BehaviorSubject<MenuItemDetailedGet | undefined>(undefined);
}
