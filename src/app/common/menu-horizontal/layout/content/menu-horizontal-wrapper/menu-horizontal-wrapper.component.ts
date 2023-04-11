import { AfterViewInit, Component, ContentChildren, HostListener, OnDestroy, QueryList } from '@angular/core';
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
export class MenuHorizontalWrapperComponent implements AfterViewInit, OnDestroy {

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

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const position = window.pageYOffset + this.stickyBarHeight;
    
    if (this.elementToScrollPosition.length === 1) {

      this.menuEventsService.onElementScrolled({
        name: this.getElementName(this.elementToScrollPosition[0].element),
        order: this.elementToScrollPosition[0].order
      });
      return;
    } else if (this.elementToScrollPosition.length > 1) {
      for (let i  = 1; i < this.elementToScrollPosition.length; i++) {
        if (this.elementToScrollPosition[i].offsetTop > position) {
          this.menuEventsService.onElementScrolled({
            name: this.getElementName(this.elementToScrollPosition[i - 1].element),
            order: this.elementToScrollPosition[i - 1].order
          });
          return;
        }
      }

      const lastId = this.elementToScrollPosition.length - 1;
      this.menuEventsService.onElementScrolled({
        name: this.getElementName(this.elementToScrollPosition[lastId].element),
        order: this.elementToScrollPosition[lastId].order
      });
    }
  }

  private getElementName(element: MenuHorizontalElementWrapperComponent) : string {
    if (element._name === undefined) {
      throw 'Element name is undefined'
    } else {
      return element._name;
    }
  }

  private onElementChanged(event: ChangeElementEvent) {
    const element = this.elementsRefs!.get(event.element.order);
    if (element) {
      let elementTopOffset = this.getElementScrollTopPosition(event);
      elementTopOffset += this.stickyBarHeight;
      elementTopOffset -= 60;

      // Scroll to position which is inside element div
      window.scrollTo({ top: elementTopOffset - this.stickyBarHeight});
    }
  }

  private getElementScrollTopPosition(event: ChangeElementEvent) : number {
    for (let i  = 1; i < this.elementToScrollPosition.length; i++) {
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
    let order = 0;

    const orderedElements = this.getOrderedElements(this.getAllElements(this.elementsRefs));
    
    for (const element of orderedElements) {

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

    const allComponents: MenuHorizontalElementWrapperComponent[] = [];

    for (const e of event) {
      allComponents.push(e);
    }

    return allComponents;
  }

  private getOrderedElements(allComponents: MenuHorizontalElementWrapperComponent[]) : MenuHorizontalElementWrapperComponent[] {
    const orderedComponents = allComponents
        .filter(e => e.elementContent?.nativeElement != undefined)
        .sort(e => e.elementContent?.nativeElement.offsetTop);
      
    return orderedComponents;
  }

  private calcElementsSizes() {
    if (!this.elementsRefs) { throw 'Elements not found'; }
    // Clear
    this.elementToScrollPosition = [];

    const allElements = this.getAllElements(this.elementsRefs);
    const orderedComponents = this.getOrderedElements(allElements);

    const orderedComponentsMap : { order: number, element: MenuHorizontalElementWrapperComponent }[] = [];
    for (let orderedComponentNum = 0; orderedComponentNum < orderedComponents.length; orderedComponentNum ++) {
      orderedComponentsMap.push({
        order: orderedComponentNum,
        element: orderedComponents[orderedComponentNum]
      })
    }


    const pageHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;

    // Elements which can be scrolled to screen top (with margin freeMoveBorder)
    const attachedElements = orderedComponentsMap.filter(e => {
      const offsetTop = e.element.elementContent!.nativeElement.offsetTop;
      const offsetBottom = pageHeight - offsetTop;
      return offsetBottom > windowHeight;
    });

    // Elements which cant be scrolled over top screen border (with margin freeMoveBorder)
    let freeElements = orderedComponentsMap.filter(e => {
      const offsetTop = e.element.elementContent!.nativeElement.offsetTop;
      const offsetBottom = pageHeight - offsetTop;
      return offsetBottom <= windowHeight;
    });


    // Distance from page top to last attached element top
    let freeBorderOffset: number;
    // Last of attachedElements (the bottom one)
    if (attachedElements.length > 0) {
      const lastAttached = attachedElements[attachedElements.length - 1];
      
      freeBorderOffset = lastAttached.element.elementContent!.nativeElement.offsetTop;
      freeElements = [attachedElements.pop()!].concat(freeElements);
    } else {
      freeBorderOffset = 0;
    }

    const scrollHeight = pageHeight - windowHeight;
    const freeBorderHeight = scrollHeight - freeBorderOffset;

    for (const element of orderedComponentsMap) {
      const topElementOffset = element.element.elementContent?.nativeElement.offsetTop;

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
          const menuElementPositionN = element.order - attachedElements.length;
          const menuElementsNCount = freeElements.length;

          const scrollPercentage = menuElementPositionN / menuElementsNCount;
          const scrollMove = (freeBorderHeight * scrollPercentage);
  
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
