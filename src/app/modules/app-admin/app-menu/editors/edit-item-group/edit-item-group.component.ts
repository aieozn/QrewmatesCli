import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemGroupData, MenuItemGroupGet } from '@common/api-client/models';
import { MenuItemGroupControllerService } from '@common/api-client/services';
import { EditorDialogService } from '../editor-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, catchError, takeUntil, tap } from 'rxjs';
import { EditItemGroupService } from './edit-item-group-service/edit-item-group-service';
import { Trimers } from '../../trimmer/trimmers';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-item-group',
  templateUrl: './edit-item-group.component.html'
})
export class EditItemGroupComponent implements OnDestroy {

  readonly dishValue = $localize`Dish`
  readonly createNewDishValue = $localize`'Create new dish'`
  
  group: MenuItemGroupGet | undefined;
  emptyItemGroup: MenuItemGroupData;
  private categoryRef: string;
  private readonly onDestroy = new Subject<void>();

  groupFields = {
    groupName: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    groupDescription: new FormControl('', [Validators.maxLength(512)]),
  };

  constructor(
    private menuItemGroupService: MenuItemGroupControllerService,
    private accountService: AccountService,
    private editDialogService: EditorDialogService,
    private route: ActivatedRoute,
    private router: Router,
    protected editItemGroupService: EditItemGroupService,
  ) {
    this.categoryRef = this.route.parent!.snapshot.paramMap.get('categoryRef')!;

    this.emptyItemGroup = {
      available: true,
      categoryRef: this.categoryRef,
      name: ''
    }

    this.route.parent!.params.pipe(
      tap(params => this.initComponent(params['menuItemGroupRef'])),
      takeUntil(this.onDestroy)
    ).subscribe()
  }

  private initComponent(menuItemGroupRef: string | undefined) {
    if (menuItemGroupRef) {
      this.menuItemGroupService.getItemGroupDetails({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemGroupRef: menuItemGroupRef
      }).pipe(
        tap(e => this.editItemGroupService.clearWithValue(e)),
        tap(e => this.group = JSON.parse(JSON.stringify(e))),
        catchError(() => {
          this.close();
          throw 'Failed to load group details'
        })
      ).subscribe()
    } else {
      this.editItemGroupService.clear(this.categoryRef)
    }
  }

  onSave() {
    if (this.group !== undefined) {
      const data = this.editItemGroupService.getGroupData()
  
      this.menuItemGroupService.putItemGroup({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemGroupRef: this.group.ref,
        body: Trimers.trimGroupData(data)
      }).subscribe(saved => {
        this.editDialogService.onItemGroupUpdated.next(saved);
        this.close()
      })
    } else {
      throw 'Operation not allowed';
    }
  }

  close() {
    this.router.navigate(['.'], { relativeTo: this.route.parent })
  }

  onDelete() {
    if (this.group !== undefined) {
      const originalGroupCategoryRef = this.group.ref;

      if (confirm($localize`Are you sure you want to delete this element?`)) {
        this.menuItemGroupService.deleteMenuItemGroup({
          restaurantRef: this.accountService.getRestaurantRef(),
          menuItemGroupRef: originalGroupCategoryRef
        }).subscribe(_ => {
          this.editDialogService.onItemGroupDeleted.next(originalGroupCategoryRef)
          this.close()
        })
      }
    } else {
      console.error('Menu item group not defined');
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
