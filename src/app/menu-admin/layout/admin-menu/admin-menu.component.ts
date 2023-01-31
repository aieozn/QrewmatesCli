import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuCategoryGet } from 'src/app/openapi-cli/models';
import { MenuCategoryControllerService } from 'src/app/openapi-cli/services';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent {
  
  public categories: Observable<MenuCategoryGet[]>;

  constructor(menuCategoryService: MenuCategoryControllerService, accountService: AccountService) {
    this.categories = menuCategoryService.getCategories({
      restaurantRef: accountService.getRestaurantRef()
    })
  }
}
