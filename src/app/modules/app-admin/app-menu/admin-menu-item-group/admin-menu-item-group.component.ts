import { Component, Input, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemGroupGet } from '@common/api-client/models';
import { MenuItemControllerService, MenuItemGroupControllerService } from '@common/api-client/services';
import { Subject, takeUntil, tap } from 'rxjs';
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
    this.editorDialogService.onItemDeleted.pipe(
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

  onDeleteItem(ref: string) {
    if (!this._group) { throw 'Groups not defined'; }
    this._group.menuItems = this._group.menuItems.filter(e => e.ref !== ref)
  }
}
