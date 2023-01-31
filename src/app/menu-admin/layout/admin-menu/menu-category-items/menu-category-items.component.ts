import { Component, Input } from '@angular/core';
import { MenuCategoryGet } from 'src/app/openapi-cli/models';

@Component({
  selector: 'app-menu-category-items',
  templateUrl: './menu-category-items.component.html',
  styleUrls: ['./menu-category-items.component.scss', '../menu-element-drag-drop-list.scss']
})
export class MenuCategoryItemsComponent {

  public _category: MenuCategoryGet | undefined;

  @Input() set category(value: MenuCategoryGet) {
    this._category = value;
  }


}
