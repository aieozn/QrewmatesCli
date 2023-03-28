import { Component, Inject, OnDestroy } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, filter, Subject, switchMap, takeUntil } from 'rxjs';
import { OrderElementDataWrapper } from '@common/api-client/wrapper/order-element-data-wrapper';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderMenuItemData } from './order-menu-item-data';
import { MenuItemDetailedGet, MenuItemGet, MenuItemGroupGet } from '@common/api-client/models';
import { MenuItemControllerService } from '@common/api-client/services';
import { OrderUtils } from '../../utils/order-utils';

@Component({
  selector: 'app-order-menu-item',
  templateUrl: './order-menu-item.component.html',
  styleUrls: ['./order-menu-item.component.scss']
})
export class OrderMenuItemComponent implements OnDestroy {

  public selectedItem$ = new BehaviorSubject<MenuItemDetailedGet | undefined>(undefined);
  public group: MenuItemGroupGet | undefined;
  public menuItemGroupImageUrl: string | undefined;
  public order: OrderElementDataWrapper | undefined;

  public selectItem$ = new BehaviorSubject<MenuItemGet | undefined>(undefined);
  public restaurantRef: string | undefined;
  public editMode = false;

  private readonly onDestroy = new Subject<void>();
  

  constructor(
    public dialogRef: MatDialogRef<OrderMenuItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderMenuItemData,
    private menuItemService: MenuItemControllerService
  ) {
    this.selectItem$.pipe(
      takeUntil(this.onDestroy),
      distinctUntilChanged(),
      filter(x => x !== undefined),
      switchMap(item => this.menuItemService.getItemDetails({
        restaurantRef: this.restaurantRef!,
        menuItemRef: item!.ref
      }))
    ).subscribe((item) => {
      this.order = {
        menuItem: item,
        menuItemSelects: [],
        menuItemToppings: [],
        price: item.price
      }
      
      this.selectedItem$.next(item);
    })

    this.setData(data);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  setData(data: OrderMenuItemData): void {
    this.editMode = data.editMode;
    if (!data.group) {
      console.error("Group not found");
    } else {
      this.group = data.group;
      this.restaurantRef = data.restaurantRef;
      this.loadItems(this.restaurantRef, this.group, data.item);
    }
  }

  public submit(elements: OrderElementDataWrapper[]) {
    this.dialogRef.close(elements);
  }

  compareSelects(s1: {ref: string}, s2: {ref: string}) {
    if(s1 && s2 && s1.ref === s2.ref) {
      return true;
    } else {
      return false;
    }
  }

  private loadItems(restaurantRef: string, group: MenuItemGroupGet, menuItem: OrderElementDataWrapper | undefined) {
    if (group.image) {
      this.menuItemGroupImageUrl = OrderUtils.getMultimediaUrl(restaurantRef, group.image.ref);
    }

    if (menuItem) {
      this.order = JSON.parse(JSON.stringify(menuItem));

      if (this.order !== undefined) {
        this.menuItemService.getItemDetails({
          restaurantRef: restaurantRef,
          menuItemRef: this.order.menuItem.ref
        }).subscribe(itemDetails => this.selectedItem$.next(itemDetails));
      } else {
        this.selectedItem$.next(undefined);
      }
      
    } else {
      this.selectItem$.next(group.menuItems[0]);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
