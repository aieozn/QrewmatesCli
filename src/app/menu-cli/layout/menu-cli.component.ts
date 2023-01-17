import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MenuCategoryGet } from 'src/app/openapi-cli/models';
import { MenuCategoryControllerService } from 'src/app/openapi-cli/services';
import { GenericDialogCliManager } from "../services/generic-dialog-cli-manager/generic-dialog-cli-manager";
import { RestaurantService } from '../../shared/menu-horizontal/service/restaurant/restaurant.service';
import { OrderService } from '../services/order/order.service';
import { OrderWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-wrapper';

@Component({
  selector: 'app-menu-cli',
  templateUrl: './menu-cli.component.html',
  styleUrls: ['./menu-cli.component.scss']
})
export class MenuCliComponent implements OnInit, OnDestroy {

  public categories: MenuCategoryGet[] = [];

  public order: OrderWrapper | undefined;

  // Display black cover over items
  public shadowItems = false;

  private readonly onDestroy = new Subject<void>();

  constructor(
    private categoriesService: MenuCategoryControllerService,
    private menuCliDialogServide: GenericDialogCliManager,
    private restaurantService: RestaurantService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  private async loadCategories() {
    var restaurantRef = this.restaurantService.getRestaurantRef();

    this.categoriesService.getCategories1({
      "restaurantRef": restaurantRef
    }).pipe(
      takeUntil(this.onDestroy)
    ).subscribe((categories) => {
      this.categories = categories;
    });

    this.orderService.orderChanged.pipe(
      takeUntil(this.onDestroy)
    ).subscribe((order) => {
      this.order = order;
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
