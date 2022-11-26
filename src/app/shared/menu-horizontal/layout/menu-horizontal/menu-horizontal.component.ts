import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MenuHorizontalElement } from '../../model/menu-horizontal-element';
import { MenuEventsService } from '../../service/menu-event/menu-events.service';
import { ChangeElementEvent } from '../../service/menu-event/message/change-element-event';
import { MenuHorizontalElementComponent } from './menu-horizontal-element/menu-horizontal-element.component';

@Component({
  selector: 'app-menu-horizontal',
  templateUrl: './menu-horizontal.component.html',
  styleUrls: ['./menu-horizontal.component.scss'],
})
export class MenuHorizontalComponent implements OnDestroy, AfterViewInit, OnInit {

  public _elements: MenuHorizontalElement[] = [];
  private readonly onDestroy = new Subject<void>();

  public screenHeight: number;

  public showFullSizeMenu = false;

  @ViewChild('menuBar') menuBar!: ElementRef;
  @ViewChildren('element') domElements : QueryList<MenuHorizontalElementComponent> | undefined;


  private static readonly defaultScrollDuration = 60;
  private scrollDuration = 60;
  private scrollPosition = 0;
  private scrollTarget = 0;
  private scrollEnabled = false;

  constructor(
    private menuEventsService: MenuEventsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.screenHeight = window.innerHeight;

    this.menuEventsService.elementSelected
      .pipe(takeUntil(this.onDestroy))
      .subscribe(this.onElementSelected.bind(this))

    this.menuEventsService.elementScrolled
      .pipe(takeUntil(this.onDestroy))
      .subscribe(this.onElementScrolled.bind(this))
  }

  ngOnInit(): void {
    this.menuEventsService.menuElements
      .pipe(takeUntil(this.onDestroy))
      .subscribe((elements) => {
        this._elements = elements
        this.changeDetectorRef.detectChanges();
      });
  }

  ngAfterViewInit(): void {
    this.menuBar.nativeElement.addEventListener('scroll', this.scrollCoordinator.bind(this));
  }

  private onElementSelected(event: ChangeElementEvent) {
    console.info("Change active menu element");
    this.hideMenu();
    
    if (this.domElements) {
      var element = document.getElementById('menu-horizontal-element-' + event.element.order);
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

  private onElementScrolled(event: ChangeElementEvent) {
    console.info("Change active menu element");
    
    if (this.domElements) {
      var element = document.getElementById('menu-horizontal-element-' + event.element.order);
      if (element) {
        this.domElements.forEach(e => {
          if (e._element!.order === event.element.order) {
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

  goTo(element: MenuHorizontalElement) {
    this.menuEventsService.onElementSelected(element);
    this.hideMenu();
  }

  hideMenu() {
    document.body.style.overflow = 'auto';
    this.showFullSizeMenu = false;
  }
}
