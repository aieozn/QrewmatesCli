import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuCategoryGet } from 'src/app/openapi-cli/models';
import { ChangeMenuCategoryEvent } from 'src/app/menu-cli/services/menu-event/message/change-menu-category-event';
import { MenuEventsService } from '../../services/menu-event/menu-events.service';
import { MenuHorizontalElementComponent } from './menu-horizontal-element/menu-horizontal-element.component';

@Component({
  selector: 'app-menu-horizontal',
  templateUrl: './menu-horizontal.component.html',
  styleUrls: ['./menu-horizontal.component.scss']
})
export class MenuHorizontalComponent implements OnInit, OnDestroy {

  public _categories: MenuCategoryGet[] = [];
  categorySelectedSubscription: Subscription;
  categoryScrolledSubscription: Subscription;

  public screenHeight: number;

  public showFullSizeMenu = false;

  @ViewChild('menuBar') menuBar!: ElementRef;
  @ViewChildren('element') categoriesDomElements : QueryList<MenuHorizontalElementComponent> | undefined;

  @Input() set categories(categories: MenuCategoryGet[]) {
    this._categories = categories;
  }

  constructor(
    private menuEventsService: MenuEventsService
  ) {
    this.screenHeight = window.innerHeight;

    this.categorySelectedSubscription = this.menuEventsService.menuCategorySelected.subscribe(this.onMenuCategorySelected.bind(this))
    this.categoryScrolledSubscription = this.menuEventsService.menuCategoryScrolled.subscribe(this.onMenuCategoryScrolled.bind(this))
  }

  ngOnInit(): void {
  }

  private onMenuCategorySelected(event: ChangeMenuCategoryEvent) {
    console.info("Change active menu category");
    this.hideMenu();
    
    if (this.categoriesDomElements) {
      var element = document.getElementById('menu-horizontal-element-' + event.categry.ref);
      if (element) {
        this.menuBar.nativeElement.scrollTo({ left: element.offsetLeft - 50, behavior: "smooth"});
      }
    }
  }

  private onMenuCategoryScrolled(event: ChangeMenuCategoryEvent) {
    console.info("Change active menu category");
    
    if (this.categoriesDomElements) {
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

  private unsubscribeOnMenuCategorySelected() {
    if (!this.categorySelectedSubscription.closed) {
      this.categorySelectedSubscription.unsubscribe();
    }
  }

  private unsubscribeOnMenuCategoryScrolled() {
    if (!this.categoryScrolledSubscription.closed) {
      this.categoryScrolledSubscription.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenHeight = window.innerHeight;
  }

  toogleFullSizeMenu() {
    this.showFullSizeMenu = !this.showFullSizeMenu;

    if (this.showFullSizeMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  goToCategory(category: MenuCategoryGet) {
    this.menuEventsService.onMenuCategorySelected(category);
    this.hideMenu();
  }

  hideMenu() {
    document.body.style.overflow = 'auto';
    this.showFullSizeMenu = false;
  }
}
