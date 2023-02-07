import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuCategoryGet, MenuItemGet, MenuItemGroupGet } from 'src/app/openapi-cli/models';

@Component({
  selector: 'app-menu-category-items',
  templateUrl: './menu-category-items.component.html',
  styleUrls: ['./menu-category-items.component.scss', '../menu-element-drag-drop-list.scss']
})
export class MenuCategoryItemsComponent {

  @Output('openItemGroupEditor')
  openItemGroupEditor = new EventEmitter<{
    group: MenuItemGroupGet,
    categoryRef: string
  }>();

  public _category: MenuCategoryGet | undefined;

  @Input() set category(value: MenuCategoryGet) {
    this._category = value;
  }

  public openEditor(menuItemGroup: MenuItemGroupGet) {
    if (this._category) {
      this.openItemGroupEditor.emit({
        group: menuItemGroup,
        categoryRef: menuItemGroup.category
      })
    } else {
      throw 'Category not defined';
    }
    
  }


}
