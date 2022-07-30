import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { MenuCategoryGet } from 'src/app/openapi-cli/models';
import { MenuCategoryControllerService } from 'src/app/openapi-cli/services';

@Component({
  selector: 'app-menu-cli',
  templateUrl: './menu-cli.component.html',
  styleUrls: ['./menu-cli.component.scss']
})
export class MenuCliComponent implements OnInit {

  private resraurantRef = {
    restaurantRef: "R00000000000"
  };
  public categories: MenuCategoryGet[] = [];

  constructor(private categoriesService: MenuCategoryControllerService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  private async loadCategories() {
    this.categories = await firstValueFrom(this.categoriesService.getCategories(this.resraurantRef));
  }

}
