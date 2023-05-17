import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MenuItemDetailedGet } from '@common/api-client/models';
import { MenuItemControllerService } from '@common/api-client/services';
import { AccountService } from '@common/account-utils/services/account.service';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EditItemService } from './edit-item-service/edit-item.service';
import { EditorDialogService } from '../editor-dialog.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss', '../edit-element.scss']
})
export class EditItemComponent implements OnDestroy {
  
  fullItem: BehaviorSubject<MenuItemDetailedGet | undefined> = new BehaviorSubject<MenuItemDetailedGet | undefined>(undefined);
  
  private readonly onDestroy = new Subject<void>();
  private categoryRef: string
  dirty = false

  constructor(
    private itemService: MenuItemControllerService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private editItemService: EditItemService,
    private editorDialogService: EditorDialogService
  ) {
    this.categoryRef = this.route.parent!.snapshot.paramMap.get('categoryRef')!;

    this.route.params.subscribe(params => {
      this.loadItemDetails(params['menuItemRef']);
    })

    this.editItemService.onUpdate.pipe(
      tap(() => this.dirty = true),
      takeUntil(this.onDestroy)
    ).subscribe()

    this.fullItem = editItemService.activeItem;
  }

  isValid(validation: {[key: string] : FormControl}) : boolean {
    return !Object.values(validation).map(e => e.invalid).includes(true);
  }

  isUpdated(validation: {[key: string] : FormControl}) : boolean {
    return Object.values(validation).map(e => e.dirty).includes(true);
  }

  onSave() {
    const itemValue = this.fullItem.getValue();
    if (itemValue === undefined) { throw 'Undefined item value'; }

    this.itemService.putItem({
      restaurantRef: this.accountService.getRestaurantRef(),
      menuItemRef: itemValue.ref,
      body: itemValue
    }).pipe(
      tap(e => {
        this.fullItem.next(e);
        this.close()
      })
    ).subscribe()
  }

  close() {
    this.router.navigate(['/admin/menu/category', this.categoryRef])
  }

  onDelete() {
    const itemValue = this.fullItem.getValue();
    if (itemValue === undefined) { throw 'Undefined item value'; }

    if (confirm($localize`Are you sure you want to delete this option?`)) {
      this.itemService.deleteItem({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemRef: itemValue.ref
      }).pipe(
        tap(() => this.editorDialogService.onDeleteItem.next({
          ref: itemValue.ref
        })),
        tap(() => this.close())
      ).subscribe()
    } 
  }

  loadItemDetails(itemRef: string) {
    this.itemService.getItemDetails({
      restaurantRef: this.accountService.getRestaurantRef(),
      menuItemRef: itemRef
    }).pipe(
      takeUntil(this.onDestroy),
      tap(e => this.editItemService.activeItem.next(e))
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  openAllergens() {
    this.router.navigate(['allergens'], { relativeTo: this.route })
  }

  openSelects() {
    this.router.navigate(['selects'], { relativeTo: this.route })
  }
}
