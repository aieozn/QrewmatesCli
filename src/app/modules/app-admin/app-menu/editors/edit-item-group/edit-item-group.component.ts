import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemGroupData, MenuItemGroupGet } from '@common/api-client/models';
import { MenuItemGroupControllerService } from '@common/api-client/services';
import { EditorDialogService } from '../editor-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, tap } from 'rxjs';
import { EditItemGroupService } from './edit-item-group-service/edit-item-group-service';

@Component({
  selector: 'app-edit-item-group',
  templateUrl: './edit-item-group.component.html',
  styleUrls: ['../edit-element.scss']
})
export class EditItemGroupComponent implements OnDestroy {
  group: MenuItemGroupGet | undefined;
  emptyItemGroup: MenuItemGroupData;
  private categoryRef: string;
  private readonly onDestroy = new Subject<void>();

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

    this.route.params.subscribe(params => {
      this.initComponent(params['menuItemGroupRef'])
    })
  }

  private initComponent(menuItemGroupRef: string | undefined) {
    if (menuItemGroupRef) {
      this.menuItemGroupService.getItemGroupDetails({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemGroupRef: menuItemGroupRef
      }).pipe(
        tap(e => this.editItemGroupService.groupData.next(e)),
      ).subscribe()
    }
  }

  isValid(): boolean {
    return this.editItemGroupService.isValid.getValue();
  }

  isUpdated(): boolean {
    return this.editItemGroupService.isUpdated.getValue();
  }

  onSave() {
    if (this.group !== undefined) {
      const data = this.editItemGroupService.groupData.getValue();
      if (data === undefined) { throw 'Group data is not defined'; }
  
      this.menuItemGroupService.putItemGroup({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemGroupRef: this.group.ref,
        body: data
      }).subscribe(saved => {
        this.editDialogService.onItemGroupUpdated.next(saved);
        this.close()
      })
    } else {
      throw 'Operation not allowed';
    }
  }

  close() {
    this.router.navigate(['/admin/menu/category', this.categoryRef])
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
