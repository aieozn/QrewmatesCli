import { Component, OnDestroy } from '@angular/core';
import { MenuItemData, MenuItemDetailedGet } from '@common/api-client/models';
import { MenuItemControllerService, MenuItemGroupControllerService } from '@common/api-client/services';
import { AccountService } from '@common/account-utils/services/account.service';
import { BehaviorSubject, Subject, catchError, switchMap, takeUntil, tap, combineLatest, zip} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EditItemService } from './edit-item-service/edit-item.service';
import { EditorDialogService } from '../editor-dialog.service';
import { Trimers } from '../../trimmer/trimmers';
import { EditAllergensService } from '../edit-allergens/edit-allergens-service/edit-allergens.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html'
})
export class EditItemComponent implements OnDestroy {
  
  emptyItem: MenuItemData | undefined;
  name: string | undefined;

  private readonly onDestroy = new Subject<void>();
  private categoryRef: string
  // Data fetched from server, available only in edit mode
  fullItem: MenuItemDetailedGet | undefined;

  isUpdated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  tabs : {
    name: string,
    icon: string,
    routerLink: string
  }[] = [
    {
      name: 'Toppings',
      icon: 'add_circle',
      routerLink: 'toppings'
    },
    {
      name: 'Selects',
      icon: 'check_circle',
      routerLink: 'selects'
    },
    {
      name: 'Allergens',
      icon: 'info',
      routerLink: 'allergens'
    },
    {
      name: 'Edit',
      icon: 'settings',
      routerLink: 'settings'
    }
  ]

  constructor(
    private itemService: MenuItemControllerService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    protected editItemService: EditItemService,
    protected editAllergensService: EditAllergensService,
    private editGroupService: MenuItemGroupControllerService,
    private editorDialogService: EditorDialogService
  ) {
    this.categoryRef = this.route.parent!.snapshot.paramMap.get('categoryRef')!;

    zip([
      this.route.parent!.params,
      this.route.params
    ]).pipe(
      tap(([parentParams, componentParams]) => this.loadItemDetails(componentParams['menuItemRef'], parentParams['menuItemGroupRef'])),
      takeUntil(this.onDestroy)
    ).subscribe();


    combineLatest([
      this.editItemService.updated(),
      this.editAllergensService.updated()
    ]).pipe(
      tap(([a, b]) => {
        this.isUpdated.next(a || b)
      }), 
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  onSave() {
    const itemValue = this.editItemService.getItemData();
    const allergens = this.editAllergensService.getAllergensData()

    if (this.fullItem !== undefined) {
      this.itemService.putItem({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemRef: this.fullItem.ref,
        body: Trimers.trimMenuItemData({
          ...itemValue,
          allergens: allergens,
          price: itemValue.price!
        })
      }).pipe(
        tap(e => {
          this.editorDialogService.onItemUpdated.next(e);
          this.close()
        })
      ).subscribe()
    } else {
      this.itemService.postItem({
        restaurantRef: this.accountService.getRestaurantRef(),
        body: Trimers.trimMenuItemData({
          ...itemValue,
          allergens: allergens,
          price: itemValue.price!
        })
      }).pipe(
        tap(e => {
          this.editorDialogService.onItemCreated.next(e);
          this.close()
        })
      ).subscribe()
    }
  }

  close() {
    this.router.navigate(['.'], { relativeTo: this.route.parent })
  }

  onDelete() {
    const itemValue = this.fullItem;
    if (itemValue === undefined) { throw 'Undefined item'; }

    if (confirm($localize`Are you sure you want to delete this option?`)) {
      this.itemService.deleteItem({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemRef: itemValue.ref
      }).pipe(
        tap(() => this.editorDialogService.onItemDeleted.next({
          ref: itemValue.ref,
          groupRef: itemValue.menuItemGroupRef,
          categoryRef: this.categoryRef
        })),
        tap(() => this.close())
      ).subscribe()
    } 
  }

  loadItemDetails(itemRef: string | undefined, groupRef: string) {
    console.log(itemRef, groupRef)
    if (itemRef !== undefined) {
      this.itemService.getItemDetails({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemRef: itemRef
      }).pipe(
        takeUntil(this.onDestroy),
        tap(e => this.editItemService.clearWithValue(e)),
        tap(e => this.editAllergensService.clearWithValue(e.allergens)),
        tap(e => this.name = e.name),
        tap(e => this.fullItem = e)
      ).subscribe()
    } else {
      this.editGroupService.getItemGroupDetails({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemGroupRef: groupRef
      }).pipe(
        switchMap(group => this.itemService.getItemDetails({
          restaurantRef: this.accountService.getRestaurantRef(),
          menuItemRef: group.menuItems[0].ref
        })),
        catchError(() => {
          this.close()
          throw 'Failed to load category details'
        }),
        tap(firstGroupElement => this.editItemService.clearWithValue({
          name: firstGroupElement.name,
          price: firstGroupElement.price,
          selectCollections: Trimers.trimRefList(firstGroupElement.selectCollections),
          toppingCollections: Trimers.trimRefList(firstGroupElement.toppingCollections),
          available: firstGroupElement.available,
          menuItemGroupRef: groupRef,
          menuItemGroupName: firstGroupElement.menuItemGroupName
        })),
        tap(firstGroupElement => this.editAllergensService.clearWithValue(firstGroupElement.allergens))
      ).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
