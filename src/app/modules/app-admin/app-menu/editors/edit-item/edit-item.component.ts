import { Component, OnDestroy } from '@angular/core';
import { MenuItemData, MenuItemDetailedGet } from '@common/api-client/models';
import { MenuItemControllerService, MenuItemGroupControllerService } from '@common/api-client/services';
import { AccountService } from '@common/account-utils/services/account.service';
import { Subject, catchError, switchMap, takeUntil, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EditItemService } from './edit-item-service/edit-item.service';
import { EditorDialogService } from '../editor-dialog.service';
import { Trimers } from '../../trimmer/trimmers';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss', '../edit-element.scss']
})
export class EditItemComponent implements OnDestroy {
  
  emptyItem: MenuItemData | undefined;
  name: string | undefined;

  private readonly onDestroy = new Subject<void>();
  private categoryRef: string
  private groupRef: string
  // Data fetched from server, available only in edit mode
  fullItem: MenuItemDetailedGet | undefined;

  constructor(
    private itemService: MenuItemControllerService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    protected editItemService: EditItemService,
    private editGroupService: MenuItemGroupControllerService,
    private editorDialogService: EditorDialogService
  ) {
    this.categoryRef = this.route.parent!.snapshot.paramMap.get('categoryRef')!;
    this.groupRef = this.route.parent!.snapshot.paramMap.get('menuItemGroupRef')!;

    this.route.params.pipe(
      tap(params => this.loadItemDetails(params['menuItemRef'], params['menuItemGroupRef'])),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  onSave() {
    const itemValue = this.editItemService.getItemData();

    if (this.fullItem !== undefined) {
      this.itemService.putItem({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemRef: this.fullItem.ref,
        body: Trimers.trimMenuItemData(itemValue)
      }).pipe(
        tap(e => {
          this.editorDialogService.onItemUpdated.next(e);
          this.close()
        })
      ).subscribe()
    } else {
      this.itemService.postItem({
        restaurantRef: this.accountService.getRestaurantRef(),
        body: Trimers.trimMenuItemData(itemValue)
      }).pipe(
        tap(e => {
          this.editorDialogService.onItemCreated.next(e);
          this.close()
        })
      ).subscribe()
    } 
  }

  close() {
    this.router.navigate(['/admin/menu/category', this.categoryRef])
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
    if (itemRef !== undefined) {
      this.itemService.getItemDetails({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemRef: itemRef
      }).pipe(
        takeUntil(this.onDestroy),
        tap(e => this.editItemService.updateItem(e)),
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
        tap(firstGroupElement => this.editItemService.updateItem({
          allergens: firstGroupElement.allergens,
          name: firstGroupElement.name,
          price: firstGroupElement.price,
          selectCollections: firstGroupElement.selectCollections,
          toppingCollections: firstGroupElement.toppingCollections,
          available: firstGroupElement.available,
          menuItemGroupRef: groupRef,
          menuItemGroupName: firstGroupElement.menuItemGroupName
        }))
      ).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  // TODO 
  // openAllergens() {
  //   this.router.navigate(['allergens'], { relativeTo: this.route })
  // }

  // openSelects() {
  //   this.router.navigate(['selects'], { relativeTo: this.route })
  // }
}
