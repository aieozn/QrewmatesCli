import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MenuHorizontalElement } from '../../model/menu-horizontal-element';
import { ChangeElementEvent } from './message/change-element-event';

@Injectable({
  providedIn: 'root'
})
export class MenuEventsService {
  elementSelected = new EventEmitter<ChangeElementEvent>();
  elementScrolled = new EventEmitter<ChangeElementEvent>();

  menuElements = new BehaviorSubject<MenuHorizontalElement[]>([]);
  menuResized = new Subject<void>();

  private scrolledElement: MenuHorizontalElement | undefined;

  onElementSelected(element: MenuHorizontalElement) {
    this.elementSelected.emit(new ChangeElementEvent(element));
  }

  onElementScrolled(element: MenuHorizontalElement) {
    if (this.scrolledElement?.order === element.order) { return; }
    this.elementScrolled.emit(new ChangeElementEvent(element));
    this.scrolledElement = element;
  }

  setMenuElements(menuElements: MenuHorizontalElement[]) {
    this.scrolledElement = undefined;
    this.menuElements.next(menuElements);
  }

  onResizeElements() {
    this.menuResized.next();
  }
}
