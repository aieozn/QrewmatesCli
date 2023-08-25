import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@common/account-utils/services/account.service';
import { UserDetailsGet } from '@common/api-client/models';
import { UsersControllerService } from '@common/api-client/services';
import { Observable, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnDestroy {

  private readonly onDestroy = new Subject<void>();
  user$: Observable<UserDetailsGet> = new Observable();

  fields = {
    name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]),
  };

  readonly userValue = $localize`User`
  readonly createNewUserValue = $localize`'Create new user'`

  constructor(
    route: ActivatedRoute,
    private usersService: UsersControllerService,
    private accountService: AccountService,
    private router: Router
  ) {
    route.params.pipe(
      tap(params => this.load(params['userRef'])),
      takeUntil(this.onDestroy)
    ).subscribe();
  }


  load(ref: string) {
    this.user$ = this.usersService.getUser({
      restaurantRef: this.accountService.getRestaurantRef(),
      userRef: ref
    }).pipe(
      tap(u => {
        this.fields.email.setValue(u.email);
        this.fields.name.setValue(u.name);
      })
    )
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
    this.router.navigate(['/admin/team'])
  }

  onSave() {
    
  }

  onTrySave() {
  }

  onDelete() {

  }
}
