import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemSelectControllerService } from '@common/api-client/services';
import { BehaviorSubject, Subject, combineLatest, takeUntil, tap } from 'rxjs';
import { EditSelectService } from './edit-select-service/edit-select.service';
import { EditAllergensService } from '../edit-allergens/edit-allergens-service/edit-allergens.service';
import { MenuItemSelectDetailedGet } from '@common/api-client/models';
import { Trimers } from '../../trimmer/trimmers';
import { EditorDialogService } from '../editor-dialog.service';

@Component({
  selector: 'app-edit-select',
  templateUrl: './edit-select.component.html'
})
export class EditSelectComponent implements OnDestroy {

  name: string | undefined;
  select: MenuItemSelectDetailedGet | undefined;
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
    private selectService: MenuItemSelectControllerService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router,
    protected editSelectService: EditSelectService,
    private editAllergensService: EditAllergensService,
    private editorDialogService: EditorDialogService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    route.params.pipe(
      tap(params => this.reloadComponent(params['selectRef'])),
      takeUntil(this.onDestroy)
    ).subscribe();

    combineLatest([
      this.editSelectService.updated(),
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
      this.selectService.getSelect({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemSelectRef: ref
      }).pipe(
        tap(e => {
          this.editAllergensService.clearWithValue(e.allergens);
          this.editSelectService.clearWithValue(e);
          this.select = e;
          this.name = e.name;
        })
      ).subscribe();
    } else {
      const collectionRef = this.route.parent?.snapshot.paramMap.get('selectCollectionRef');

      if (collectionRef) {
        setTimeout(() => {
          this.editAllergensService.clear();
          this.editSelectService.clear(collectionRef);
          this.select = undefined;
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
    const collectionRef = this.route.parent?.snapshot.paramMap.get('selectCollectionRef')

    if (collectionRef) {
      this.router.navigate(['/admin/menu/select-collections', collectionRef])
    } else {
      this.router.navigate(['/admin/menu/select-collections'])
    }
  }

  onSave() {
    const allergens = this.editAllergensService.getAllergensData()
    const selectValue = this.editSelectService.getSelectData()
    
    if (this.select !== undefined) {
      this.selectService.putSelect({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemSelectRef: this.select.ref,
        body: Trimers.trimSelectData({
          available: selectValue.available,
          collectionRef: selectValue.collectionRef,
          description: selectValue.description,
          name: selectValue.name,
          price: selectValue.price ? selectValue.price : 0,
          allergens: allergens
        })
      }).pipe(
        tap(e => {
          this.editorDialogService.onSelectUpdated.next(e);
          this.close()
        })
      ).subscribe()
    } else {
      this.selectService.postSelect({
        restaurantRef: this.accountService.getRestaurantRef(),
        body: Trimers.trimSelectData({
          available: selectValue.available,
          collectionRef: selectValue.collectionRef,
          description: selectValue.description,
          name: selectValue.name,
          price: selectValue.price ? selectValue.price : 0,
          allergens: allergens
        })
      }).pipe(
        tap(e => {
          this.editorDialogService.onSelectCreated.next(e);
          this.close()
        })
      ).subscribe()
    }
  }

  onDelete() {
    const selectValue = this.select;
    if (selectValue === undefined) { throw 'Undefined select'; }

    if (confirm($localize`Are you sure you want to delete this select?`)) {
      this.selectService.deleteSelect({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemSelectRef: selectValue.ref
      }).pipe(
        tap(() => this.editorDialogService.onSelectDeleted.next(selectValue.ref)),
        tap(() => this.close())
      ).subscribe()
    } 
  }
}
