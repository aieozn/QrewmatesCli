import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemToppingDetailedGet } from '@common/api-client/models';
import { MenuItemToppingControllerService } from '@common/api-client/services';
import { BehaviorSubject, Subject, combineLatest, takeUntil, tap } from 'rxjs';
import { EditToppingService } from './edit-topping-service/edit-topping.service';
import { EditAllergensService } from '../edit-allergens/edit-allergens-service/edit-allergens.service';
import { EditorDialogService } from '../editor-dialog.service';
import { FormControl } from '@angular/forms';
import { Trimers } from '../../trimmer/trimmers';

@Component({
  selector: 'app-edit-topping',
  templateUrl: './edit-topping.component.html'
})
export class EditToppingComponent implements OnDestroy {

  readonly toppingValue = $localize`Topping`
  readonly createNewToppingValue = $localize`'Create new topping'`

  name: string | undefined;
  topping: MenuItemToppingDetailedGet | undefined;
  private readonly onDestroy = new Subject<void>();
  isUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  tabs : {
    name: string,
    icon: string,
    routerLink: string
  }[] = [
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
    private toppingService: MenuItemToppingControllerService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router,
    protected editToppingService: EditToppingService,
    private editAllergensService: EditAllergensService,
    private editorDialogService: EditorDialogService
  ) {
    route.params.pipe(
      tap(params => this.reloadComponent(params['toppingRef'])),
      takeUntil(this.onDestroy)
    ).subscribe();

    combineLatest([
      this.editToppingService.updated(),
      this.editAllergensService.updated()
    ]).pipe(
      tap(([a, b]) => {
        this.isUpdated.next(a || b)
      }), 
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  reloadComponent(ref: string | null) {
    if (ref) {
      this.toppingService.getTopping({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemToppingRef: ref
      }).pipe(
        tap(e => {
          this.editAllergensService.clearWithValue(e.allergens);
          this.editToppingService.clearWithValue(e);
          this.topping = e;
          this.name = e.name;
        })
      ).subscribe();
    } else {
      const collectionRef = this.route.parent?.snapshot.paramMap.get('toppingCollectionRef');

      if (collectionRef) {
        setTimeout(() => {
          this.editAllergensService.clear();
          this.editToppingService.clear(collectionRef);
          this.topping = undefined;
          this.name = undefined;
        })
      } else {
        throw 'Collection ref not found'
      }
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  isValid(validation: {[key: string] : FormControl}) : boolean {
    return !Object.values(validation).map(e => e.invalid).includes(true);
  }

  close() {
    const collectionRef = this.route.parent?.snapshot.paramMap.get('toppingCollectionRef')

    if (collectionRef) {
      this.router.navigate(['/admin/menu/topping-collections', collectionRef])
    } else {
      this.router.navigate(['/admin/menu/topping-collections'])
    }
  }

  onSave() {
    const allergens = this.editAllergensService.getAllergensData()
    const toppingValue = this.editToppingService.getToppingData()
    
    if (this.topping !== undefined) {
      this.toppingService.putTopping({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemToppingRef: this.topping.ref,
        body: Trimers.trimToppingData({
          ...toppingValue,
          allergens: allergens
        })
      }).pipe(
        tap(e => {
          this.editorDialogService.onToppingUpdated.next(e);
          this.close()
        })
      ).subscribe()
    } else {
      this.toppingService.postTopping({
        restaurantRef: this.accountService.getRestaurantRef(),
        body: Trimers.trimToppingData({
          ...toppingValue,
          allergens: allergens
        })
      }).pipe(
        tap(e => {
          this.editorDialogService.onToppingCreated.next(e);
          this.close()
        })
      ).subscribe()
    }
  }

  onDelete() {
    const toppingValue = this.topping;
    if (toppingValue === undefined) { throw 'Undefined topping'; }

    if (confirm($localize`Are you sure you want to delete this topping?`)) {
      this.toppingService.deleteTopping({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemToppingRef: toppingValue.ref
      }).pipe(
        tap(() => this.editorDialogService.onToppingDeleted.next(toppingValue.ref)),
        tap(() => this.close())
      ).subscribe()
    }
  }
}
