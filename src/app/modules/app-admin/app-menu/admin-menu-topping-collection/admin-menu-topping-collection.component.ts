import { Component, Input, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemToppingCollectionGet, MenuItemToppingGet } from '@common/api-client/models';
import { MenuItemToppingControllerService } from '@common/api-client/services';
import { Subject, takeUntil, tap } from 'rxjs';
import { EditorDialogService } from '../editors/editor-dialog.service';

@Component({
  selector: 'app-admin-menu-topping-collection',
  templateUrl: './admin-menu-topping-collection.component.html',
  styleUrls: ['../shared-css/menu-element-drag-drop-list.scss', './admin-menu-topping-collection.component.scss']
})
export class AdminMenuToppingCollectionComponent implements OnDestroy {
  private readonly onDestroy = new Subject<void>();

  _toppingCollection: MenuItemToppingCollectionGet | undefined;

  @Input() set toppingCollection(value: MenuItemToppingCollectionGet) {
    this._toppingCollection = JSON.parse(JSON.stringify(value));
  }

  constructor(
    private toppingsService: MenuItemToppingControllerService,
    private editorService: EditorDialogService,
    private accountService: AccountService
  ) {
    this.editorService.onToppingDeleted.pipe(
      tap(deletedRef => {
        if (this._toppingCollection) {
          this._toppingCollection.menuItemToppings = this._toppingCollection.menuItemToppings.filter(e => e.ref !== deletedRef)
        }
      }),
      takeUntil(this.onDestroy)
    ).subscribe()

    this.editorService.onToppingUpdated.pipe(
      tap(topping => this.onUpdateToppings(topping)),
      takeUntil(this.onDestroy)
    ).subscribe()

    this.editorService.onToppingCreated.pipe(
      tap(topping => this.onCreateTopping(topping)),
      takeUntil(this.onDestroy)
    ).subscribe()
  }

  onUpdateToppings(newValue: MenuItemToppingGet) {
    if (!this._toppingCollection) { throw 'Topping collection not defined'; }

    for (const topping of this._toppingCollection.menuItemToppings) {
      if (topping.ref === newValue.ref) {
        Object.assign(topping, newValue);
      }
    }
  }

  onCreateTopping(newValue: MenuItemToppingGet) {
    if (!this._toppingCollection) { throw 'Topping collection not defined'; }

    if (this._toppingCollection.ref === newValue.collectionRef) {
      this._toppingCollection.menuItemToppings.push(newValue);
    }
  }


  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  moveUp(topping: MenuItemToppingGet) {
    if (!this._toppingCollection) { throw 'Topping collection not defined'; }
    
    const toppingCollection = this._toppingCollection;
    const activeIndex = toppingCollection.menuItemToppings.indexOf(topping)

    this.toppingsService.moveUp1({
      restaurantRef: this.accountService.getRestaurantRef(),
      menuItemToppingRef: topping.ref
    }).pipe(
      tap(e => {
        toppingCollection.menuItemToppings[activeIndex] = toppingCollection.menuItemToppings[activeIndex + 1];
        toppingCollection.menuItemToppings[activeIndex + 1] = e
      })
    ).subscribe();
  }

  moveDown(topping: MenuItemToppingGet) {
    if (!this._toppingCollection) { throw 'Topping collection not defined'; }
    
    const toppingCollection = this._toppingCollection;
    const activeIndex = toppingCollection.menuItemToppings.indexOf(topping)

    this.toppingsService.moveDown1({
      restaurantRef: this.accountService.getRestaurantRef(),
      menuItemToppingRef: topping.ref
    }).pipe(
      tap(e => {
        toppingCollection.menuItemToppings[activeIndex] = toppingCollection.menuItemToppings[activeIndex - 1];
        toppingCollection.menuItemToppings[activeIndex - 1] = e
      })
    ).subscribe();
  }
}
