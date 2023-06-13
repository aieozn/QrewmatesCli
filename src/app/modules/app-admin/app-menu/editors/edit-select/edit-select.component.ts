import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@common/account-utils/services/account.service';
import { MenuItemSelectGet } from '@common/api-client/models';
import { MenuItemSelectControllerService } from '@common/api-client/services';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-edit-select',
  templateUrl: './edit-select.component.html',
  styleUrls: ['../edit-element.scss']
})
export class EditSelectComponent implements OnDestroy {

  select: MenuItemSelectGet | undefined;
  private readonly onDestroy = new Subject<void>();

  fields = {
    name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    description: new FormControl('', [Validators.maxLength(512)])
  };

  constructor(
    private selectService: MenuItemSelectControllerService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router
  ) {
    route.params.pipe(
      tap(params => this.reloadComponent(params['selectRef'])),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.selectService
  }

  reloadComponent(ref: string | null) {
    if (ref) {
      this.selectService.getSelect({
        restaurantRef: this.accountService.getRestaurantRef(),
        menuItemSelectRef: ref
      }).pipe(
        tap(e => {
          this.fields.name.setValue(e.name)
          this.fields.description.setValue(e.description ? e.description : '')
          this.select = e
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
    const collectionRef = this.route.parent?.snapshot.paramMap.get('selectCollectionRef')

    if (collectionRef) {
      this.router.navigate(['/admin/menu/select-collections', collectionRef])
    } else {
      this.router.navigate(['/admin/menu/select-collections'])
    }
  }

  onSave() {
    
  }

  onTrySave() {
  }

  onDelete() {

  }
}
