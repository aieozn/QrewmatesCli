import { AfterViewInit, Component, ContentChildren, ElementRef, OnDestroy, QueryList, ViewChild } from '@angular/core';
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

  @ViewChild('scrollWrapper') scrollWrapper!: ElementRef;

  // TODO tests

  private readonly onDestroy = new Subject<void>();
  @ContentChildren(MenuHorizontalElementWrapperComponent, { descendants: true }) elementsRefs: QueryList<MenuHorizontalElementWrapperComponent> | undefined;
  private elements: MenuHorizontalElement[] = []

  private elementToScrollPosition: {
    // Offset to scroll-wrapper top
    offsetTop: number,
    element: MenuHorizontalElementWrapperComponent,
    order: number
  }[] = [];

  ngAfterViewInit(): void {
    if (!this.elementsRefs) { throw 'Elements not found'; }

    this.reloadElements();
    this.elementsRefs.changes.pipe(takeUntil(this.onDestroy)).subscribe(this.reloadElements.bind(this));

    this.menuEventsService.menuResized
        .pipe(
          takeUntil(this.onDestroy),
          // After resize there are many events from different components informing about the same event
          // use debounce time to refresh only once
          debounceTime(50)).subscribe(this.calcElementsSizes.bind(this));
  }

  constructor(private menuEventsService: MenuEventsService) {
    this.menuEventsService.elementSelected
      .pipe(takeUntil(this.onDestroy)).subscribe(this.onElementChanged.bind(this))
  }

  onScroll() {

    const target = this.scrollWrapper.nativeElement;
    const scrollTop = target.scrollTop;

    if (this.elementToScrollPosition.length > 0) {
      let last = this.elementToScrollPosition[0];

      for (const element of this.elementToScrollPosition) {
        if (element.offsetTop <= scrollTop) {
          last = element;
        }
      }

      this.menuEventsService.onElementScrolled({
        name: this.getElementName(last.element),
        order: last.order
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
      const elementTopOffset = this.getElementScrollTopPosition(event);

      // Scroll to position which is inside element div
      this.scrollWrapper.nativeElement.scrollTo({ top: elementTopOffset });
    }
  }

  private getElementScrollTopPosition(event: ChangeElementEvent) : number {
    for (const element of this.elementToScrollPosition) {
      if (element.order == event.element.order) {
        return Math.ceil(element.offsetTop);
      }
    }

    return 0;
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


    for (let i = 0; i < orderedComponents.length; i++) {
      const orderedElement = orderedComponents[i];

      this.elementToScrollPosition.push({
        offsetTop: this.getElementOffset(orderedElement).top,
        element: orderedElement,
        order: i
      })
    }

    const scrollWrapperHeight = this.getScrollWrapperHeight();

    const offScrollElements = this.elementToScrollPosition.filter(element => {
      const elementOffsetBottom = this.getElementOffset(element.element).bottom;

      return elementOffsetBottom <= scrollWrapperHeight;
    })

    if (offScrollElements.length > 0) {
      const scrollWrapperScrollHeight = this.getScrollWrapperScrollHeight();
      const offScrollTop = this.getElementOffset(offScrollElements[0].element).top;
      const offScrollElementsHeight = scrollWrapperScrollHeight - offScrollTop;

      const offScrollHeight = (scrollWrapperScrollHeight - scrollWrapperHeight) - offScrollTop

      for (let i = 1; i < offScrollElements.length; i++) {
        const previousOffset = offScrollElements[i - 1].offsetTop;
        const element = offScrollElements[i];
        const elementHeight = this.getElementHeight(element.element);

        if (offScrollElementsHeight > 0) {
          const heightPercentage = (elementHeight / offScrollElementsHeight);
          element.offsetTop = previousOffset + (heightPercentage * offScrollHeight)
        }
      }
    }

    // Select active menu element
    this.onScroll();
  }

  private getScrollWrapperOffsetTop() {
    return this.scrollWrapper.nativeElement.offsetTop;
  }

  private getScrollWrapperScrollHeight() {
    return this.scrollWrapper.nativeElement.scrollHeight;
  }

  private getElementOffset(element: MenuHorizontalElementWrapperComponent) {
    const top = element.elementContent!.nativeElement.offsetTop - this.getScrollWrapperOffsetTop();
    const height = this.getElementHeight(element);

    const bottom = this.getScrollWrapperScrollHeight() - height - top;
    return { top, bottom }
  }

  private getElementHeight(element: MenuHorizontalElementWrapperComponent) {
    return element.elementContent!.nativeElement.offsetHeight;
  }

  private getScrollWrapperHeight() {
    return this.scrollWrapper.nativeElement.offsetHeight;
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
