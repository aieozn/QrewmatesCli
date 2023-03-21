import { AfterViewInit, Component, ContentChildren, HostListener, OnDestroy, OnInit, QueryList } from '@angular/core';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { MenuHorizontalElement } from '../../../model/menu-horizontal-element';
import { MenuEventsService } from '../../../service/menu-event/menu-events.service';
import { ChangeElementEvent } from '../../../service/menu-event/message/change-element-event';
import { MenuHorizontalElementWrapperComponent } from '../menu-horizontal-element-wrapper/menu-horizontal-element-wrapper.component';

@Component({
  selector: 'app-menu-horizontal-wrapper',
  templateUrl: './menu-horizontal-wrapper.component.html',
  styleUrls: ['./menu-horizontal-wrapper.component.scss']
})
export class MenuHorizontalWrapperComponent implements OnInit, AfterViewInit, OnDestroy {

  // TODO tests

  private stickyBarHeight = 60;
  private readonly onDestroy = new Subject<void>();
  @ContentChildren(MenuHorizontalElementWrapperComponent, { descendants: true }) elementsRefs: QueryList<MenuHorizontalElementWrapperComponent> | undefined;
  private elements: MenuHorizontalElement[] = []

  private elementToScrollPosition: {
    offsetTop: number,
    element: MenuHorizontalElementWrapperComponent,
    order: number
  }[] = [];

  constructor(private menuEventsService: MenuEventsService) {
    this.menuEventsService.elementSelected
      .pipe(takeUntil(this.onDestroy)).subscribe(this.onElementChanged.bind(this))
  }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])
  public onScroll() {
    var position = window.pageYOffset + this.stickyBarHeight;
    
    if (this.elementToScrollPosition.length === 1) {
      this.menuEventsService.onElementScrolled({
        name: this.elementToScrollPosition[0].element._name!,
        order: this.elementToScrollPosition[0].order
      });
      return;
    } else if (this.elementToScrollPosition.length > 1) {
      for (var i  = 1; i < this.elementToScrollPosition.length; i++) {
        if (this.elementToScrollPosition[i].offsetTop > position) {
          this.menuEventsService.onElementScrolled({
            name: this.elementToScrollPosition[i - 1].element._name!,
            order: this.elementToScrollPosition[i - 1].order
          });
          return;
        }
      }

      var lastId = this.elementToScrollPosition.length - 1;
      this.menuEventsService.onElementScrolled({
        name: this.elementToScrollPosition[lastId].element._name!,
        order: this.elementToScrollPosition[lastId].order
      });
    }
  }

  private onElementChanged(event: ChangeElementEvent) {
    var element = this.elementsRefs!.get(event.element.order);
    if (element) {
      console.info("Scroll to list element");

      var elementTopOffset = this.getElementScrollTopPosition(event);
      elementTopOffset += this.stickyBarHeight;
      elementTopOffset -= 60;

      // Scroll to position which is inside element div
      window.scrollTo({ top: elementTopOffset - this.stickyBarHeight});
    }
  }

  private getElementScrollTopPosition(event: ChangeElementEvent) : number {
    for (var i  = 1; i < this.elementToScrollPosition.length; i++) {
      if (this.elementToScrollPosition[i].order === event.element.order) {
        return this.elementToScrollPosition[i].offsetTop;
      }
    }

    return 0;
  }

  ngAfterViewInit(): void {
    if (!this.elementsRefs) { throw 'Elements not found'; }

    this.reloadElements();

    this.elementsRefs.changes
        .pipe(takeUntil(this.onDestroy)).subscribe(this.reloadElements.bind(this));

    this.menuEventsService.menuResized
        .pipe(
          takeUntil(this.onDestroy),
          // After resize there are many events from different components informing about the same event
          // use debounce time to refresh only once
          debounceTime(50)).subscribe(this.calcElementsSizes.bind(this));

  }

  private reloadElements() {
    if (!this.elementsRefs) { throw 'Elements not found'; }

    this.elements = [];
    var order = 0;

    var orderedElements = this.getOrderedElements(this.getAllElements(this.elementsRefs));
    
    for (let element of orderedElements) {

      if (element._name) {
        this.elements.push({
          name: element._name,
          order: order
        })
      }

      order ++;
    }

    this.menuEventsService.setMenuElements(this.elements);

    // Run once
    this.calcElementsSizes();
  }

  private getAllElements(event: QueryList<MenuHorizontalElementWrapperComponent>) : MenuHorizontalElementWrapperComponent[] {
    if (event.length === 0) { return []; }

    var allComponents: MenuHorizontalElementWrapperComponent[] = [];
    for (var i = 0; i < event.length; i++) {
      allComponents.push(event.get(i)!);
    }

    return allComponents;
  }

  private getOrderedElements(allComponents: MenuHorizontalElementWrapperComponent[]) : MenuHorizontalElementWrapperComponent[] {
    var orderedComponents = allComponents
        .filter(e => e.elementContent?.nativeElement != undefined)
        .sort(e => e.elementContent!.nativeElement.offsetTop);
      
    return orderedComponents;
  }

  private calcElementsSizes() {
    if (!this.elementsRefs) { throw 'Elements not found'; }
    // Clear
    this.elementToScrollPosition = [];

    let allElements = this.getAllElements(this.elementsRefs);
    let orderedComponents = this.getOrderedElements(allElements);

    let orderedComponentsMap : { order: number, element: MenuHorizontalElementWrapperComponent }[] = [];
    for (var orderedComponentNum = 0; orderedComponentNum < orderedComponents.length; orderedComponentNum ++) {
      orderedComponentsMap.push({
        order: orderedComponentNum,
        element: orderedComponents[orderedComponentNum]
      })
    }


    var pageHeight = document.body.scrollHeight;
    var windowHeight = window.innerHeight;

    // Elements which can be scrolled to screen top (with margin freeMoveBorder)
    var attachedElements = orderedComponentsMap.filter(e => {
      var offsetTop = e.element.elementContent!.nativeElement.offsetTop;
      var offsetBottom = pageHeight - offsetTop;
      return offsetBottom > windowHeight;
    });

    // Elements which cant be scrolled over top screen border (with margin freeMoveBorder)
    var freeElements = orderedComponentsMap.filter(e => {
      var offsetTop = e.element.elementContent!.nativeElement.offsetTop;
      var offsetBottom = pageHeight - offsetTop;
      return offsetBottom <= windowHeight;
    });


    // Distance from page top to last attached element top
    var freeBorderOffset: number;
    // Last of attachedElements (the bottom one)
    if (attachedElements.length > 0) {
      var lastAttached = attachedElements[attachedElements.length - 1];
      
      freeBorderOffset = lastAttached.element.elementContent!.nativeElement.offsetTop;
      freeElements = [attachedElements.pop()!].concat(freeElements);
    } else {
      freeBorderOffset = 0;
    }

    var scrollHeight = pageHeight - windowHeight;
    var freeBorderHeight = scrollHeight - freeBorderOffset;

    for (let element of orderedComponentsMap) {
      let topElementOffset = element.element.elementContent?.nativeElement.offsetTop;

      if (topElementOffset < freeBorderOffset) {
        this.elementToScrollPosition.push({
          offsetTop: topElementOffset,
          element: element.element,
          order: element.order
        })
      } else {
        if (freeElements.length === 1) {
          this.elementToScrollPosition.push({
            offsetTop: topElementOffset,
            element: element.element,
            order: element.order
          })
        } else {
          var menuElementPositionN = element.order - attachedElements.length;
          var menuElementsNCount = freeElements.length;

          var scrollPercentage = menuElementPositionN / menuElementsNCount;
          var scrollMove = (freeBorderHeight * scrollPercentage);
  
          this.elementToScrollPosition.push({
            offsetTop: scrollMove + freeBorderOffset,
            element: element.element,
            order: element.order
          })
        }
      }
    }

    // Select active menu element
    this.onScroll();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
