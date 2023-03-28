import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MenuHorizontalElement } from '../../model/menu-horizontal-element';
import { ChangeElementEvent } from './message/change-element-event';

@Injectable({
  providedIn: 'root'
})
export class MenuEventsService {
  public elementSelected = new EventEmitter<ChangeElementEvent>();
  public elementScrolled = new EventEmitter<ChangeElementEvent>();

  public menuElements = new BehaviorSubject<MenuHorizontalElement[]>([]);
  public menuResized = new Subject<void>();

  private scrolledElement: MenuHorizontalElement | undefined;

  public onElementSelected(element: MenuHorizontalElement) {
    this.elementSelected.emit(new ChangeElementEvent(element));
  }

  public onElementScrolled(element: MenuHorizontalElement) {
    if (this.scrolledElement?.order === element.order) { return; }
    this.elementScrolled.emit(new ChangeElementEvent(element));
    this.scrolledElement = element;
  }

  public setMenuElements(menuElements: MenuHorizontalElement[]) {
    this.scrolledElement = undefined;
    this.menuElements.next(menuElements);
  }

  public onResizeElements() {
    this.menuResized.next();
  }
}
