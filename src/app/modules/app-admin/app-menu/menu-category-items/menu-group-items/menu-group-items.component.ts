import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemGet, MenuItemGroupGet } from '@common/api-client/models';
import { MenuItemControllerService, MenuItemGroupControllerService } from '@common/api-client/services';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-menu-group-items',
  templateUrl: './menu-group-items.component.html',
  styleUrls: ['../../menu-element-drag-drop-list.scss', './menu-group-items.component.scss']
})
export class MenuGroupItemsComponent {

  _group: MenuItemGroupGet | undefined;

  @Input() set group(group: MenuItemGroupGet) {
    this._group = group;
  }

  constructor(
    private menuItemService: MenuItemControllerService,
    private accountService: AccountService,
    private groupService: MenuItemGroupControllerService
  ) {

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
    console.log("DROP")
    if (!this._group) { throw 'Groups not defined'; }
    if (event.previousIndex != event.currentIndex) {
      this.arrayMove(this._group.menuItems, event.previousIndex, event.currentIndex)
    }
  }
}
