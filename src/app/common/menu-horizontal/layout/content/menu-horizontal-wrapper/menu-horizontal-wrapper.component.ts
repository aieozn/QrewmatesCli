import { AfterViewInit, Component, ContentChildren, Input, OnDestroy, QueryList, Renderer2 } from '@angular/core';
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

  private scrollWrapper: HTMLElement | undefined;

  @Input('scrollContainerId')
  scrollContainerId : string | undefined

  // TODO tests

  private readonly onDestroy = new Subject<void>();
  @ContentChildren(MenuHorizontalElementWrapperComponent, { descendants: true }) elementsRefs: QueryList<MenuHorizontalElementWrapperComponent> | undefined;
  private elements: MenuHorizontalElement[] = []

  scrollListener: (() => void) | undefined;

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

    if (this.scrollContainerId) {
      this.scrollWrapper = document.getElementById(this.scrollContainerId)!
      this.listenForElement(this.scrollWrapper);
    } else {
      this.listenForWindow()
    }
  }

  private listenForElement(element: HTMLElement) {
    if (this.scrollListener) {
      this.scrollListener();
    }

    this.scrollListener = this.renderer.listen(element, 'scroll', _ => this.onScroll())
  }

  private listenForWindow() {
    if (this.scrollListener) {
      this.scrollListener();
    }

    this.scrollListener = this.renderer.listen('window', 'scroll', _ => this.onScroll())
  }


  constructor(private menuEventsService: MenuEventsService, private renderer: Renderer2) {
    this.menuEventsService.elementSelected
      .pipe(takeUntil(this.onDestroy)).subscribe(this.onElementChanged.bind(this))
  }

  onScroll() {
    const scrollTop = this.getScrollWrapperScrollTop();

    console.log(scrollTop)

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
      this.scrollTo(elementTopOffset);
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
    if (!this.elementsRefs) { return; }

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
      // At least one element can be scrolled with default behaviour
      if (offScrollElements.length < this.elementToScrollPosition.length) {
        const scrollWrapperScrollHeight = this.getScrollWrapperScrollHeight();
        const offScrollTop = this.getElementOffset(offScrollElements[0].element).top;
        const offScrollElementsHeight = scrollWrapperScrollHeight - offScrollTop;
        const offScrollHeight = (scrollWrapperScrollHeight - scrollWrapperHeight) - offScrollTop
  
        for (let i = 1; i < offScrollElements.length; i++) {
          const element = offScrollElements[i];
          const previousElement = offScrollElements[i - 1];
          const previousOffset = previousElement.offsetTop;
          const previousElementHeight = this.getElementHeight(previousElement.element);
  
          if (offScrollElementsHeight > 0) {
            const previousHeightPercentage = (previousElementHeight / offScrollElementsHeight);
            element.offsetTop = previousOffset + (previousHeightPercentage * offScrollHeight)
          }
        }
      } else {
        // First element starts in point which cant be achived by top screen side
        offScrollElements[0].offsetTop = 0;
        const scrollWrapperScrollHeight = this.getScrollWrapperScrollHeight();
        const offScrollHeight = scrollWrapperScrollHeight - scrollWrapperHeight;

        for (let i = 1; i < offScrollElements.length; i++) {
          const element = offScrollElements[i];
          const previousElement = offScrollElements[i - 1];
          const previousOffset = previousElement.offsetTop;
          const previousElementHeight = this.getElementHeight(previousElement.element);
  
          if (scrollWrapperScrollHeight > 0) {
            const previousHeightPercentage = (previousElementHeight / scrollWrapperScrollHeight);
            element.offsetTop = previousOffset + (previousHeightPercentage * offScrollHeight)
          }
        }

      }
    }

    // Select active menu element
    this.onScroll();
  }

  private getScrollWrapperOffsetTop() : number {
    return this.scrollWrapper ? this.scrollWrapper.offsetTop : 0;    
  }

  private getScrollWrapperScrollHeight() : number {
    return this.scrollWrapper ? this.scrollWrapper.scrollHeight : document.body.scrollHeight;
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
    return this.scrollWrapper ? this.scrollWrapper.offsetHeight : window.innerHeight;
  }

  private getScrollWrapperScrollTop() {
    return this.scrollWrapper ? this.scrollWrapper.scrollTop : window.scrollY;    
  }

  private scrollTo(offset: number) {
    if (this.scrollWrapper) {
      this.scrollWrapper.scrollTo({ top: offset });
    } else {
      window.scrollTo({ top: offset })
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
