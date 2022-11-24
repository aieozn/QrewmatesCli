import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MenuCategoryGet } from 'src/app/openapi-cli/models';
import { MenuCategoryControllerService } from 'src/app/openapi-cli/services';
import { ChangeMenuCategoryEvent } from 'src/app/menu-cli/services/menu-event/message/change-menu-category-event';
import { MenuCategoryComponent } from './menu-category/menu-category.component';
import { MenuEventsService } from '../services/menu-event/menu-events.service';
import { MenuCliDialogService } from './generic-dialog/service/generic-dialog.service';
import { RestaurantService } from '../services/restaurant/restaurant.service';

@Component({
  selector: 'app-menu-cli',
  templateUrl: './menu-cli.component.html',
  styleUrls: ['./menu-cli.component.scss']
})
export class MenuCliComponent implements OnInit, OnDestroy, AfterViewInit {

  private stickyBarHeight = 60;
  public categories: MenuCategoryGet[] = [];

  // Display black cover over items
  public shadowItems = false;

  private readonly onDestroy = new Subject<void>();

  @ViewChildren('category') categoryElements: QueryList<MenuCategoryComponent> | undefined;

  private menuCategoryToScrollPosition: {
    offsetTop: number,
    category: MenuCategoryComponent
  }[] = [];

  constructor(
    private categoriesService: MenuCategoryControllerService,
    private menuEventsService: MenuEventsService,
    private menuCliDialogServide: MenuCliDialogService,
    private restaurantService: RestaurantService
  ) {
    this.menuEventsService.menuCategorySelected
      .pipe(takeUntil(this.onDestroy)).subscribe(this.onMenuCategoryChanged.bind(this))
  }

  ngAfterViewInit(): void {
    this.categoryElements?.changes
        .pipe(takeUntil(this.onDestroy)).subscribe(this.onCategoriesElementsChange.bind(this));
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  private onCategoriesElementsChange(event: QueryList<MenuCategoryComponent>) {
    if (event.length === 0) { return; }

    var allCategoriesComponents: MenuCategoryComponent[] = [];
    for (var i = 0; i < event.length; i++) {
      allCategoriesComponents.push(event.get(i)!);
    }

    var orderedCategories = allCategoriesComponents
        .filter(e => e.categoryHtmlElement?.nativeElement != undefined)
        .sort(e => e.categoryHtmlElement!.nativeElement.offsetTop);

    var pageHeight = document.body.scrollHeight;
    var windowHeight = window.innerHeight;

    // Categories which can be scrolled to screen top (with margin freeMoveBorder)
    var attachedCategories = orderedCategories.filter(e => {
      var offsetTop = e.categoryHtmlElement!.nativeElement.offsetTop;
      var offsetBottom = pageHeight - offsetTop;
      return offsetBottom > windowHeight;
    });

    // Categories which cant be scrolled over top screen border (with margin freeMoveBorder)
    var freeCategories = orderedCategories.filter(e => {
      var offsetTop = e.categoryHtmlElement!.nativeElement.offsetTop;
      var offsetBottom = pageHeight - offsetTop;
      return offsetBottom <= windowHeight;
    });


    // Distance from page top to last attached category top
    var freeBorderOffset: number;
    // Last of attachedCategories (the bottom one)
    if (attachedCategories.length > 0) {
      var lastAttached = attachedCategories[attachedCategories.length - 1];
      freeBorderOffset = lastAttached.categoryHtmlElement!.nativeElement.offsetTop;
      freeCategories = [lastAttached].concat(freeCategories);
    } else {
      freeBorderOffset = 0;
    }

    var scrollHeight = pageHeight - windowHeight;
    var freeBorderHeight = scrollHeight - freeBorderOffset;

    for (var category of allCategoriesComponents) {
      var topCategoryOffset = category.categoryHtmlElement?.nativeElement.offsetTop;

      if (topCategoryOffset < freeBorderOffset) {
        this.menuCategoryToScrollPosition.push({
          offsetTop: topCategoryOffset,
          category: category
        })
      } else {
        if (freeCategories.length === 1) {
          this.menuCategoryToScrollPosition.push({
            offsetTop: topCategoryOffset,
            category: category
          })
        } else {
          var menuCategoryPositionN = 0;
          var menuCategoryNCount = freeCategories.length;

          for (var freeCategory of freeCategories) {
            if (freeCategory._category?.ref === category._category?.ref) { break; }
            menuCategoryPositionN += 1;
          }

          var scrollPercentage = menuCategoryPositionN / menuCategoryNCount;
          var scrollMove = (freeBorderHeight * scrollPercentage);
  
          this.menuCategoryToScrollPosition.push({
            offsetTop: scrollMove + freeBorderOffset,
            category: category
          })
        }
      }
    }

    // Select active menu element
    this.onScroll();
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

  @HostListener('window:scroll', ['$event'])
  public onScroll() {
    var position = window.pageYOffset + this.stickyBarHeight;

    if (this.menuCategoryToScrollPosition.length === 1) {
      this.menuEventsService.onMenuCategoryScrolled(this.menuCategoryToScrollPosition[0].category._category!);
      return;
    } else if (this.menuCategoryToScrollPosition.length > 1) {
      for (var i  = 1; i < this.menuCategoryToScrollPosition.length; i++) {
        if (this.menuCategoryToScrollPosition[i].offsetTop > position) {
          this.menuEventsService.onMenuCategoryScrolled(this.menuCategoryToScrollPosition[i - 1].category._category!);
          return;
        }
      }

      var lastId = this.menuCategoryToScrollPosition.length - 1;
      this.menuEventsService.onMenuCategoryScrolled(this.menuCategoryToScrollPosition[lastId].category._category!);
    }
  }

  private onMenuCategoryChanged(event: ChangeMenuCategoryEvent) {
    if (event.categry.ref) {
      var element = document.getElementById('menu-element-category-' + event.categry.ref);
      if (element) {
        console.info("Scroll to menu list element");

        var categoryTopOffset = this.getMenuCategoryElementScrollTopPosition(event);
        categoryTopOffset += this.stickyBarHeight;
        categoryTopOffset -= 60;

        // Scroll to position which is inside element div
        window.scrollTo({ top: categoryTopOffset - this.stickyBarHeight});
      }
    }
  }

  private getMenuCategoryElementScrollTopPosition(event: ChangeMenuCategoryEvent) : number {
    for (var i  = 1; i < this.menuCategoryToScrollPosition.length; i++) {
      if (this.menuCategoryToScrollPosition[i].category._category?.ref === event.categry.ref) {
        return this.menuCategoryToScrollPosition[i].offsetTop;
      }
    }

    return 0;
  }

  showAboutUs() {
    this.menuCliDialogServide.openAboutUs()
  }
}
