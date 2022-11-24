import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { MenuCategoryGet } from 'src/app/openapi-cli/models';
import { ChangeMenuCategoryEvent } from 'src/app/shared/menu-horizontal/service/menu-event/message/change-menu-category-event';
import { MenuEventsService } from '../../service/menu-event/menu-events.service';
import { MenuHorizontalElementComponent } from './menu-horizontal-element/menu-horizontal-element.component';

@Component({
  selector: 'app-menu-horizontal',
  templateUrl: './menu-horizontal.component.html',
  styleUrls: ['./menu-horizontal.component.scss'],
})
export class MenuHorizontalComponent implements OnDestroy, AfterViewInit {

  public _categories: MenuCategoryGet[] = [];
  categorySelectedSubscription: Subscription;
  categoryScrolledSubscription: Subscription;
  private readonly onDestroy = new Subject<void>();

  public screenHeight: number;

  public showFullSizeMenu = false;

  @ViewChild('menuBar') menuBar!: ElementRef;
  @ViewChildren('element') categoriesDomElements : QueryList<MenuHorizontalElementComponent> | undefined;


  private static readonly defaultScrollDuration = 60;
  private scrollDuration = 60;
  private scrollPosition = 0;
  private scrollTarget = 0;
  private scrollEnabled = false;

  @Input() set categories(categories: MenuCategoryGet[]) {
    this._categories = categories;
  }

  constructor(
    private menuEventsService: MenuEventsService
  ) {
    this.screenHeight = window.innerHeight;

    this.categorySelectedSubscription = this.menuEventsService.menuCategorySelected
      .asObservable()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(this.onMenuCategorySelected.bind(this))

    this.categoryScrolledSubscription = this.menuEventsService.menuCategoryScrolled
      .asObservable()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(this.onMenuCategoryScrolled.bind(this))
  }

  ngAfterViewInit(): void {
    this.menuBar.nativeElement.addEventListener('scroll', this.scrollCoordinator.bind(this));
  }

  private onMenuCategorySelected(event: ChangeMenuCategoryEvent) {
    console.info("Change active menu category");
    this.hideMenu();
    
    if (this.categoriesDomElements) {
      var element = document.getElementById('menu-horizontal-element-' + event.categry.ref);
      if (element) {
        this.menuBar.nativeElement.scrollLeft = element.offsetLeft - 50;
      }
    }
  }

  private scrollTo(target: number) {
    this.scrollEnabled = true;
    this.scrollTarget = target;
    this.scrollDuration = MenuHorizontalComponent.defaultScrollDuration;
    this.scrollPosition = this.menuBar.nativeElement.scrollLeft;
    this.scrollCoordinator();
  }

  private scrollCoordinator() {
    if (this.scrollEnabled) {
      let active = this.scrollPosition;
      let toPass = (this.scrollTarget - active);
      let step = toPass / Math.max(1, this.scrollDuration);
      this.scrollDuration -= 1;

      this.menuBar.nativeElement.scrollLeft = active + step;
      this.scrollPosition = active + step;

      if (this.scrollDuration === 0 || Math.abs(toPass) < 1) {
        this.scrollEnabled = false;
        this.scrollPosition = this.menuBar.nativeElement.scrollLeft;
        this.menuBar.nativeElement.scrollLeft = this.scrollTarget;
      }
    }
  }

  private onMenuCategoryScrolled(event: ChangeMenuCategoryEvent) {
    console.info("Change active menu category");
    
    if (this.categoriesDomElements) {
      var element = document.getElementById('menu-horizontal-element-' + event.categry.ref);
      if (element) {
        this.categoriesDomElements.forEach(e => {
          if (e._category?.ref === event.categry.ref) {
            e.select();
          } else {
            e.unselect();
          }
        })

        this.scrollTo(element.offsetLeft - 50);
      }
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();

    this.menuBar.nativeElement.removeEventListener('scroll', this.scrollCoordinator);
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
