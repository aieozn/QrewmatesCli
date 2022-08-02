import { Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuCategoryGet } from 'src/app/openapi-cli/models';
import { MenuEventsService } from 'src/app/services/menu-events.service';
import { ChangeMenuCategoryEvent } from 'src/app/services/message/change-menu-category-event';
import { MenuHorizontalElementComponent } from './menu-horizontal-element/menu-horizontal-element.component';

@Component({
  selector: 'app-menu-horizontal',
  templateUrl: './menu-horizontal.component.html',
  styleUrls: ['./menu-horizontal.component.scss']
})
export class MenuHorizontalComponent implements OnInit, OnDestroy {

  public _categories: MenuCategoryGet[] = [];
  categorySelectedSubscription: Subscription | undefined;
  categoryScrolledSubscription: Subscription | undefined;

  @ViewChild('menuBar') menuBar : ElementRef | undefined;
  @ViewChildren('element') categoriesDomElements : QueryList<MenuHorizontalElementComponent> | undefined;

  @Input() set categories(categories: MenuCategoryGet[]) {
    this._categories = categories;
  }

  constructor(
    private menuEventsService: MenuEventsService
  ) { }

  ngOnInit(): void {
    this.subscribeOnMenuCategorySelected();
    this.subscribeOnMenuCategoryScrolled();
  }

  private onMenuCategorySelected(event: ChangeMenuCategoryEvent) {
    console.info("Change active menu category");
    
    if (event.categry.ref && this.menuBar && this.categoriesDomElements) {
      var element = document.getElementById('menu-horizontal-element-' + event.categry.ref);
      if (element) {
        this.menuBar.nativeElement.scrollTo({ left: element.offsetLeft - 50, behavior: "smooth"});
      }
    }
  }

  private onMenuCategoryScrolled(event: ChangeMenuCategoryEvent) {
    console.info("Change active menu category");
    
    if (event.categry.ref && this.menuBar && this.categoriesDomElements) {
      var element = document.getElementById('menu-horizontal-element-' + event.categry.ref);
      if (element) {
        this.menuBar.nativeElement.scrollTo({ left: element.offsetLeft - 50, behavior: "smooth"});

        this.categoriesDomElements.forEach(e => {
          if (e._category?.ref === event.categry.ref) {
            e.select();
          } else {
            e.unselect();
          }
        })
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeOnMenuCategoryScrolled();
    this.unsubscribeOnMenuCategorySelected();
  }

  private subscribeOnMenuCategorySelected() {
    if (this.categorySelectedSubscription === undefined) {
      this.categorySelectedSubscription = this.menuEventsService.menuCategorySelected.subscribe(this.onMenuCategorySelected.bind(this))
    }
  }

  private subscribeOnMenuCategoryScrolled() {
    if (this.categoryScrolledSubscription === undefined) {
      this.categoryScrolledSubscription = this.menuEventsService.menuCategoryScrolled.subscribe(this.onMenuCategoryScrolled.bind(this))
    }
  }

  private unsubscribeOnMenuCategorySelected() {
    if (this.categorySelectedSubscription !== undefined) {
      this.categorySelectedSubscription.unsubscribe();
      this.categorySelectedSubscription = undefined;
    }
  }

  private unsubscribeOnMenuCategoryScrolled() {
    if (this.categoryScrolledSubscription !== undefined) {
      this.categoryScrolledSubscription.unsubscribe();
      this.categoryScrolledSubscription = undefined;
    }
  }

}
