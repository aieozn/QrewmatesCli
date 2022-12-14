import { Component, Inject, OnDestroy } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, filter, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { OrderElementDataWrapper } from 'src/app/shared/openapi-cli-wrapper/order/order-element-data-wrapper';
import { MenuItemDetailedGet, MenuItemGet, MenuItemGroupGet } from 'src/app/openapi-cli/models';
import { MenuItemControllerService } from 'src/app/openapi-cli/services';
import { GenericUtils } from 'src/app/shared/utils/generic-utils';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  private readonly onDestroy = new Subject<void>();
  

  constructor(
    public dialogRef: MatDialogRef<OrderMenuItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      restaurantRef: string,
      item: OrderElementDataWrapper | undefined,
      group : MenuItemGroupGet
    },
    private menuItemDetailsService: MenuItemControllerService
  ) {
    this.selectItem$.pipe(
      takeUntil(this.onDestroy),
      distinctUntilChanged(),
      filter(x => x !== undefined),
      switchMap(item => this.menuItemDetailsService.getItemDetails({
        restaurantRef: this.restaurantRef!,
        ref: item!.ref
      }))
    ).subscribe((item) => {
      this.order = {
        menuItem: item,
        selects: [],
        toppings: [],
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

  setData(
    data: {
      restaurantRef: string,
      item: OrderElementDataWrapper | undefined,
      group : MenuItemGroupGet
    }): void {

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

  compareSelects(s1: any, s2: any) {
    if(s1 && s2 && s1.ref === s2.ref) {
      return true;
    } else {
      return false;
    }
  }

  private loadItems(restaurantRef: string, group: MenuItemGroupGet, menuItem: OrderElementDataWrapper | undefined) {
    if (group.image) {
      this.menuItemGroupImageUrl = GenericUtils.getMultimediaUrl(restaurantRef, group.image.ref);
    }

    if (menuItem) {
      this.order = JSON.parse(JSON.stringify(menuItem));
      this.selectedItem$.next(this.order?.menuItem);
    } else {
      this.selectItem$.next(group.menuItems[0]);
    }
  }
}
