import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemToppingCollectionGet } from '@common/api-client/models';
import { MenuItemToppingCollectionControllerService } from '@common/api-client/services';
import { Subject, takeUntil, tap } from 'rxjs';
import { EditorDialogService } from '../editor-dialog.service';

@Component({
  selector: 'app-edit-topping-collection',
  templateUrl: './edit-topping-collection.component.html',
  styleUrls: ['../edit-element.scss']
})
export class EditToppingCollectionComponent implements OnDestroy {
  private readonly onDestroy = new Subject<void>();
  collection: MenuItemToppingCollectionGet | undefined;
  detailsLink: string[] | undefined

  collectionFields = {
    collectionName: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    collectionDescription: new FormControl('', [Validators.maxLength(512)])
  };

  constructor(
    private route: ActivatedRoute,
    private toppingCollectionService: MenuItemToppingCollectionControllerService,
    private accountService: AccountService,
    private router: Router,
    private editorDialogService: EditorDialogService
  ) {
    route.parent?.params.pipe(
      tap(params => this.reloadComponent(params['toppingCollectionRef'])),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  reloadComponent(ref: string | null) {
    if (ref) {
      this.toppingCollectionService.getToppingCollection({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemToppingCollectionRef: ref
      }).pipe(
        tap(e => {
          this.collectionFields.collectionName.setValue(e.name)
          this.collectionFields.collectionDescription.setValue(e.description ? e.description : '')
          this.collection = e
        })
      ).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  isValid(validation: {[key: string] : FormControl}) : boolean {
    return !Object.values(validation).map(e => e.invalid).includes(true);
  }

  isUpdated(validation: {[key: string] : FormControl}) : boolean {
    return Object.values(validation).map(e => e.dirty).includes(true);
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
    if (this.collection !== undefined) {
      this.toppingCollectionService.putToppingCollection({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemToppingCollectionRef: this.collection.ref,
        body: {
          name: this.collectionFields.collectionName.value!,
          description: this.collectionFields.collectionDescription.value ?? undefined
        }
      }).subscribe(saved => {
        this.editorDialogService.onToppingCollectionUpdated.next(saved);
        this.close();
      })
    } else {
      this.toppingCollectionService.postToppingCollection({
        restaurantRef: this.accountService.getRestaurantRef(),
        body: {
          name: this.collectionFields.collectionName.value!,
          description: this.collectionFields.collectionDescription.value ?? undefined
        }
      }).subscribe(saved => {
        this.editorDialogService.onToppingCollectionCreated.next(saved);
        this.close();
      })
    }
  }

  onTrySave() {
    this.collectionFields.collectionName.markAllAsTouched();
    this.collectionFields.collectionDescription.markAllAsTouched();
  }

  onDelete() {
    if (this.collection !== undefined) {
      const originalRef = this.collection.ref;

      if (confirm($localize`Are you sure you want to delete this collection?`)) {
        this.toppingCollectionService.deleteToppingCollection({
          restaurantRef: this.accountService.getRestaurantRef(),
          menuItemToppingCollectionRef: originalRef
        }).subscribe(_ => {
          this.editorDialogService.onToppingCollectionDeleted.next(originalRef)
          this.close()
        })
      }
      
    } else {
      console.error('Collection not defined');
    }
  }
}
