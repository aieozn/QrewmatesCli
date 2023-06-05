import { Component, Input, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemGet, MenuItemGroupGet } from '@common/api-client/models';
import { MenuItemControllerService } from '@common/api-client/services';
import { Subject, takeUntil, tap } from 'rxjs';
import { EditorDialogService } from '../editors/editor-dialog.service';

@Component({
  selector: 'app-admin-menu-item-group',
  templateUrl: './admin-menu-item-group.component.html',
  styleUrls: ['../shared-css/menu-element-drag-drop-list.scss', './admin-menu-item-group.component.scss']
})
export class AdminMenuItemGroupComponent implements OnDestroy {
  _group: MenuItemGroupGet | undefined;
  private readonly onDestroy = new Subject<void>();

  @Input() set group(group: MenuItemGroupGet) {
    this._group = JSON.parse(JSON.stringify(group));
  }

  constructor(
    private menuItemService: MenuItemControllerService,
    private accountService: AccountService,
    private editorDialogService: EditorDialogService
  ) {
    this.editorDialogService.onItemDeleted.pipe(
      tap(e => this.onDeleteItem(e.ref)),
      takeUntil(this.onDestroy)
    ).subscribe()

    this.editorDialogService.onItemUpdated.pipe(
      tap(e => this.onUpdateItem(e)),
      takeUntil(this.onDestroy)
    ).subscribe()

    this.editorDialogService.onItemCreated.pipe(
      tap(e => this.onCreateItem(e)),
      takeUntil(this.onDestroy)
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  onDeleteItem(ref: string) {
    if (!this._group) { throw 'Group not defined'; }
    this._group.menuItems = this._group.menuItems.filter(e => e.ref !== ref)
  }

  onUpdateItem(item: MenuItemGet) {
    if (!this._group) { throw 'Group not defined'; }

    for (const menuItem of this._group.menuItems) {
      if (menuItem.ref === item.ref) {
        Object.assign(menuItem, item);
      }
    }
  }

  onCreateItem(item: MenuItemGet) {
    if (!this._group) { throw 'Group not defined'; }

    if (item.menuItemGroupRef === this._group.ref) {
      this._group.menuItems.push(item);
    }
  }

  moveUp(item: MenuItemGet) {
    if (!this._group) { throw 'Group not defined'; }
    
    const group = this._group;
    const activeIndex = group.menuItems.indexOf(item)

    this.menuItemService.moveUp({
      restaurantRef: this.accountService.getRestaurantRef(),
      menuItemRef: item.ref
    }).pipe(
      tap(e => {
        group.menuItems[activeIndex] = group.menuItems[activeIndex + 1];
        group.menuItems[activeIndex + 1] = e
      })
    ).subscribe();
  }

  moveDown(item: MenuItemGet) {
    if (!this._group) { throw 'Group not defined'; }
    const activeIndex = this._group.menuItems.indexOf(item)
    const group = this._group;

    this.menuItemService.moveDown({
      restaurantRef: this.accountService.getRestaurantRef(),
      menuItemRef: item.ref
    }).pipe(
      tap(e => {
        group.menuItems[activeIndex] = group.menuItems[activeIndex - 1];
        group.menuItems[activeIndex - 1] = e;
      })
    ).subscribe();
  }
}
