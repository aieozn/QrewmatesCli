import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MenuCategoryGet } from 'src/app/openapi-cli/models';
import { MenuCategoryControllerService } from 'src/app/openapi-cli/services';
import { GenericDialogCliManager } from "../services/generic-dialog-cli-manager/generic-dialog-cli-manager";
import { RestaurantService } from '../services/restaurant/restaurant.service';

@Component({
  selector: 'app-menu-cli',
  templateUrl: './menu-cli.component.html',
  styleUrls: ['./menu-cli.component.scss']
})
export class MenuCliComponent implements OnInit, OnDestroy {

  public categories: MenuCategoryGet[] = [];

  // Display black cover over items
  public shadowItems = false;

  private readonly onDestroy = new Subject<void>();

  constructor(
    private categoriesService: MenuCategoryControllerService,
    private menuCliDialogServide: GenericDialogCliManager,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  private async loadCategories() {
    var restaurantRef = this.restaurantService.getRestaurantRef();

    console.log("Get categories");
    this.categoriesService.getCategories1({
      "restaurantRef": restaurantRef
    }).pipe(
      takeUntil(this.onDestroy)
    ).subscribe((categories) => {
      this.categories = categories;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  showAboutUs() {
    this.menuCliDialogServide.openAboutUs()
  }

  public submit() {
    this.menuCliDialogServide.openSummary();
  }
}
