import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MenuItemDetailedGet } from '@common/api-client/models';
import { MenuItemControllerService } from '@common/api-client/services';
import { AccountService } from '@common/account-utils/services/account.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss', '../edit-element.scss']
})
export class EditItemComponent implements OnDestroy {
  
  fullItem: MenuItemDetailedGet | undefined;
  
  private readonly onDestroy = new Subject<void>();

  itemFields = {
    itemFields: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    itemDescription: new FormControl('', [Validators.maxLength(512)])
  };

  constructor(
    private itemService: MenuItemControllerService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.loadItemDetails(params['menuItemRef']);
    })
  }

  isValid(validation: {[key: string] : FormControl}) : boolean {
    return !Object.values(validation).map(e => e.invalid).includes(true);
  }

  isUpdated(validation: {[key: string] : FormControl}) : boolean {
    return Object.values(validation).map(e => e.dirty).includes(true);
  }

  onSave() {
    throw 'Not implemented yet'
  }

  cancel() {
    throw 'Not implemented yet'
  }

  onDelete() {
    throw 'Not implemented yet'
  }

  loadItemDetails(itemRef: string) {
    this.itemService.getItemDetails({
      restaurantRef: this.accountService.getRestaurantRef(),
      menuItemRef: itemRef
    }).pipe(
      takeUntil(this.onDestroy),
      tap(e => this.fullItem = e)
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
