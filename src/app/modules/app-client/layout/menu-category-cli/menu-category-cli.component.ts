import { Component, Input } from '@angular/core';
import { MenuCategoryGet } from '@common/api-client/models';

@Component({
  selector: 'app-menu-category-cli',
  templateUrl: './menu-category-cli.component.html',
  styleUrls: ['./menu-category-cli.component.scss']
})
export class MenuCategoryCliComponent {

  // TODO create placeholders

  _category: MenuCategoryGet | undefined;

  @Input() set category(value: MenuCategoryGet) {
    this._category = value;
  }

}
