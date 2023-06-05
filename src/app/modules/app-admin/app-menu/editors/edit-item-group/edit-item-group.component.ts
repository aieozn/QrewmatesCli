import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemGroupData, MenuItemGroupGet } from '@common/api-client/models';
import { MenuItemGroupControllerService } from '@common/api-client/services';
import { EditorDialogService } from '../editor-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { EditItemService } from '../edit-item/edit-item-service/edit-item.service';

@Component({
  selector: 'app-edit-item-group',
  templateUrl: './edit-item-group.component.html',
  styleUrls: ['../edit-element.scss']
})
export class EditItemGroupComponent {
  group: MenuItemGroupGet | undefined;
  emptyItemGroup: MenuItemGroupData;
  activeItemGroup: MenuItemGroupData;
  private categoryRef: string;

  constructor(
    private menuItemGroupService: MenuItemGroupControllerService,
    private accountService: AccountService,
    private editDialogService: EditorDialogService,
    private route: ActivatedRoute,
    private router: Router,
    private editItemService: EditItemService,
  ) {
    this.categoryRef = this.route.parent!.snapshot.paramMap.get('categoryRef')!;

    this.emptyItemGroup = {
      available: true,
      categoryRef: this.categoryRef,
      name: ''
    }
    this.activeItemGroup = this.emptyItemGroup;

    this.route.params.subscribe(params => {
      this.initComponent(params['menuItemGroupRef'])
    })
  }

  private initComponent(menuItemGroupRef: string | undefined) {
    this.activeItemGroup = this.emptyItemGroup;

    if (menuItemGroupRef) {
      this.menuItemGroupService.getItemGroupDetails({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemGroupRef: menuItemGroupRef
      }).pipe(
        tap(group => this.loadItemGroupFieldsValues(group)),
        tap(e => this.editItemService.activeGroup.next(e)),
      ).subscribe()
    }
  }

  private loadItemGroupFieldsValues(value: MenuItemGroupGet) {
    this.group = value
    this.groupFields.groupName.setValue(value.name);
    this.groupFields.groupDescription.setValue(value.description ?? null);

    this.activeItemGroup = JSON.parse(JSON.stringify(value));
  }

  isValid(validation: {[key: string] : FormControl}) : boolean {
    return !Object.values(validation).map(e => e.invalid).includes(true);
  }

  isUpdated(validation: {[key: string] : FormControl}) : boolean {
    return Object.values(validation).map(e => e.dirty).includes(true);
  }

  onSave() {
    if (this.group !== undefined) {
      this.activeItemGroup.name = this.groupFields.groupName.value!;
      this.activeItemGroup.description = this.groupFields.groupDescription.value ?? undefined;
  
      this.menuItemGroupService.putItemGroup({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemGroupRef: this.group.ref,
        body: this.activeItemGroup
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
}
