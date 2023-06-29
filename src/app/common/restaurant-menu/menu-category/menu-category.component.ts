import { Component, Input } from '@angular/core';
import { MenuCategoryGet } from '@common/api-client/models';

@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.scss']
})
export class MenuCategoryComponent {

  // TODO create placeholders

  _category: MenuCategoryGet | undefined;

  @Input() set category(value: MenuCategoryGet) {
    this._category = value;
  }

}
