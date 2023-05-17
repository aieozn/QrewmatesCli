import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemGet, MenuItemGroupGet } from '@common/api-client/models';
import { MenuItemControllerService, MenuItemGroupControllerService } from '@common/api-client/services';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { EditorDialogService } from '../editors/editor-dialog.service';

@Component({
  selector: 'app-admin-menu-item-group',
  templateUrl: './admin-menu-item-group.component.html',
  styleUrls: ['../menu-element-drag-drop-list.scss', './admin-menu-item-group.component.scss']
})
export class AdminMenuItemGroupComponent implements OnDestroy {
  _group: MenuItemGroupGet | undefined;
  private readonly onDestroy = new Subject<void>();

  @Input() set group(group: MenuItemGroupGet) {
    this._group = group;
  }

  constructor(
    private menuItemService: MenuItemControllerService,
    private accountService: AccountService,
    private groupService: MenuItemGroupControllerService,
    private editorDialogService: EditorDialogService
  ) {
    this.editorDialogService.onDeleteItem.pipe(
      tap(e => this.onDeleteItem(e.ref)),
      takeUntil(this.onDestroy)
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private reloadGroup() {
    if (!this._group) { throw 'Group not defined'; }

    const activeGroup = this._group;
    this.groupService.getItemGroupDetails({
      restaurantRef: this.accountService.getRestaurantRef(),
      menuItemGroupRef: this._group.ref
    }).subscribe(c => {
      Object.assign(activeGroup, c);
    })
  }

  private arrayMove(items: MenuItemGet[], old_index: number, new_index: number
  ) {
    items[old_index].elementOrder = items[new_index].elementOrder;
    const newOrder = items[new_index].elementOrder;

    this.menuItemService.getItemDetails({
      restaurantRef: this.accountService.getRestaurantRef(),
      menuItemRef: items[old_index].ref
    }).pipe(
      switchMap(item => {
        item.elementOrder = newOrder;
        return this.menuItemService.putItem({
          restaurantRef: this.accountService.getRestaurantRef(),
          menuItemRef: item.ref,
          body: item
        })
      }),
      tap(() => {
        this.reloadGroup();
      })
    ).subscribe();

    items.splice(new_index, 0, items.splice(old_index, 1)[0]);
  };

  dragDropListCaught(event: CdkDragDrop<string[]>) {
    if (!this._group) { throw 'Groups not defined'; }
    if (event.previousIndex != event.currentIndex) {
      this.arrayMove(this._group.menuItems, event.previousIndex, event.currentIndex)
    }
  }

  edit(item: MenuItemGet) {
    this.editorDialogService.onEditItem.emit(item);
  }

  onDeleteItem(ref: string) {
    if (!this._group) { throw 'Groups not defined'; }

    this._group.menuItems = this._group.menuItems.filter(e => e.ref !== ref)
  }
}
