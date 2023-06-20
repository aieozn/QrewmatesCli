import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemGroupData, MenuItemGroupGet } from '@common/api-client/models';
import { MenuItemControllerService, MenuItemGroupControllerService } from '@common/api-client/services';
import { BehaviorSubject, Subject, catchError, combineLatest, takeUntil, tap } from 'rxjs';
import { EditorDialogService } from '../editor-dialog.service';
import { EditItemGroupService } from '../edit-item-group/edit-item-group-service/edit-item-group-service';
import { EditItemService } from '../edit-item/edit-item-service/edit-item.service';
import { Trimers } from '../../trimmer/trimmers';
import { EditAllergensService } from '../edit-allergens/edit-allergens-service/edit-allergens.service';

@Component({
  selector: 'app-edit-item-group-aggregate',
  templateUrl: './edit-item-group-aggregate.component.html'
})
export class EditItemGroupAggregateComponent {
  emptyGroup: MenuItemGroupData | undefined;
  name: string | undefined;

  private readonly onDestroy = new Subject<void>();
  private categoryRef: string
  // Data fetched from server, available only in edit mode
  fullGroup: MenuItemGroupGet | undefined;

  isUpdated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isValid: BehaviorSubject<boolean> = new BehaviorSubject(false);

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
    private gorupService: MenuItemGroupControllerService,
    private itemService: MenuItemControllerService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    protected editItemGroupService: EditItemGroupService,
    protected editItemService: EditItemService,
    private editorDialogService: EditorDialogService,
    private editAllergensService: EditAllergensService
  ) {
    this.editItemGroupService.clearErrors();
    this.categoryRef = this.route.parent!.snapshot.paramMap.get('categoryRef')!;

    this.route.params.pipe(
      tap(params => this.loadGroupDetails(params['menuItemGroupRef'])),
      takeUntil(this.onDestroy)
    ).subscribe();

    combineLatest([
      this.editItemService.updated(),
      this.editItemGroupService.updated(),
      this.editAllergensService.updated()
    ]).pipe(
      tap(([a, b, c]) => {
        this.isUpdated.next(a || b || c)
      }), 
      takeUntil(this.onDestroy)
    ).subscribe();

    combineLatest([
      this.editItemService.valid(),
      this.editItemGroupService.valid()
    ]).pipe(
      tap(([a, b]) => {
        this.isValid.next(a && b)
      }), 
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  onSave() {
    const activeGroup = this.editItemGroupService.getGroupData()
    const activeItem = this.editItemService.getItemData()

    if (this.fullGroup !== undefined) {
      if (this.fullGroup?.menuItems.length !== 1) {
        throw 'Updating colleciton as agregate not allowed'
      }

      this.gorupService.putItemGroupAggregate({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemGroupRef: this.fullGroup.ref,
        body: {
          item: Trimers.trimLinkedItem({
            ...activeItem,
            allergens: this.editAllergensService.getAllergensData()
          }),
          group: Trimers.trimGroupData(activeGroup)
        }
      }).pipe(
        tap(e => this.editorDialogService.onItemGroupUpdated.next(e)),
        tap(() => this.close())
      ).subscribe();
    } else {
      this.gorupService.postItemGroup({
        restaurantRef: this.accountService.getRestaurantRef(),
        body: {
          group: Trimers.trimGroupData(activeGroup),
          item: Trimers.trimLinkedItem({
            ...activeItem,
            allergens: this.editAllergensService.getAllergensData()
          })
        }
      }).pipe(
        tap(e => {
          this.editorDialogService.onItemGroupCreated.next(e);
          this.close()
        })
      ).subscribe()
    } 
  }

  close() {
    this.router.navigate(['/admin/menu/category', this.categoryRef])
  }

  onDelete() {
    const groupValue = this.fullGroup;
    if (groupValue === undefined) { throw 'Undefined item'; }

    if (confirm($localize`Are you sure you want to delete this option?`)) {
      this.gorupService.deleteMenuItemGroup({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemGroupRef: groupValue.ref
      }).pipe(
        tap(() => this.editorDialogService.onItemGroupDeleted.next(groupValue.ref)),
        tap(() => this.close())
      ).subscribe()
    } 
  }

  loadGroupDetails(groupRef: string | undefined) {
    if (groupRef !== undefined) {
      this.gorupService.getItemGroupDetails({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemGroupRef: groupRef
      }).pipe(
        tap(e => this.editItemGroupService.clearWithValue(e)),
        tap(e => this.loadItemDetails(e.menuItems[0].ref, e)),
        tap(e => this.name = e.name),
        tap(e => this.fullGroup = e),
        catchError(() => {
          this.close();
          throw 'Failed to load group details'
        }),
        takeUntil(this.onDestroy)
      ).subscribe()
    } else {
      this.editItemGroupService.clear(this.categoryRef)
      this.loadItemDetails(undefined, undefined)
    }
  }

  loadItemDetails(itemRef: string | undefined, group: MenuItemGroupGet | undefined) {
    if (itemRef !== undefined) {
      this.itemService.getItemDetails({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemRef: itemRef
      }).pipe(
        takeUntil(this.onDestroy),
        tap(e => this.editItemService.clearWithValue(e)),
        tap(e => this.editAllergensService.clearWithValue(e.allergens)),
      ).subscribe()
    } else {
      this.editItemService.clear(group)
      this.editAllergensService.clear()
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
