import { EventEmitter, Injectable } from '@angular/core';
import { MenuCategoryGet } from '../openapi-cli/models';
import { ChangeMenuCategoryEvent } from './message/change-menu-category-event';

@Injectable({
  providedIn: 'root'
})
export class MenuEventsService {
  public menuCategorySelected = new EventEmitter<ChangeMenuCategoryEvent>();
  public menuCategoryScrolled = new EventEmitter<ChangeMenuCategoryEvent>();

  private scrolledCategory: MenuCategoryGet | undefined;

  constructor() { }

  public onMenuCategorySelected(menuCategoryGet: MenuCategoryGet) {
    this.menuCategorySelected.emit(new ChangeMenuCategoryEvent(menuCategoryGet));
  }

  public onMenuCategoryScrolled(menuCategoryGet: MenuCategoryGet) {
    if (this.scrolledCategory?.ref === menuCategoryGet.ref) { return; }
    this.menuCategoryScrolled.emit(new ChangeMenuCategoryEvent(menuCategoryGet));
    this.scrolledCategory = menuCategoryGet;
  }
}
