import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@common/account-utils/services/account.service';
import { UserDetailsGet } from '@common/api-client/models';
import { UsersControllerService } from '@common/api-client/services';
import { Role } from 'app/common/translators';
import { Subject, takeUntil, tap } from 'rxjs';
import { EditorService } from '../editor.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnDestroy {

  private readonly onDestroy = new Subject<void>();
  user: UserDetailsGet | undefined;

  fields = {
    name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]),
    role: new FormControl('', [Validators.required, Validators.pattern('^(ADMIN|STAFF)$')]),
  };

  roles: {
    key: Role,
    value: string
  }[] = [
    {
      key: 'ADMIN',
      value: $localize`Admin`
    },
    {
      key: 'STAFF',
      value: $localize`Staff`
    }
  ]

  readonly userValue = $localize`User`
  readonly createNewUserValue = $localize`'Create new user'`

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersControllerService,
    private accountService: AccountService,
    private router: Router,
    private editorService: EditorService
  ) {
    route.params.pipe(
      tap(params => this.load(params['userRef'])),
      takeUntil(this.onDestroy)
    ).subscribe();
  }


  load(ref: string) {
    this.usersService.getUser({
      restaurantRef: this.accountService.getRestaurantRef(),
      userRef: ref
    }).pipe(
      tap(u => {
        this.user = u;
        this.fields.email.setValue(u.email);
        this.fields.name.setValue(u.name);
        this.fields.role.setValue(u.role);
        this.fields.email.disable();

        if (this.accountService.getActiveUser()?.ref === u.ref) {
          this.fields.role.disable();
        }
      }),
      takeUntil(this.onDestroy)
    ).subscribe();
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
    if (this.user !== undefined) {

      this.usersService.putUser({
        restaurantRef: this.accountService.getRestaurantRef(),
        userRef: this.user.ref,
        body: {
          name: this.fields.name.value!,
          role: this.fields.role.value! as 'ADMIN' | 'STAFF'
        }
      }).subscribe(updated => {
        this.editorService.onUserUpdated.emit(updated)
        this.router.navigate(['.'], { relativeTo: this.route.parent })
        this.close()
      })
    } else {

    }
  }

  onTrySave() {
    Object.keys(this.fields).forEach(key => {
      (this.fields as any)[key].markAllAsTouched();
    })
  }

  onDelete() {

  }
}
