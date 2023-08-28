import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@common/account-utils/services/account.service';
import { UserDetailsGet } from '@common/api-client/models';
import { UsersControllerService } from '@common/api-client/services';
import { Role } from 'app/common/translators';
import { Subject, takeUntil, tap } from 'rxjs';
import { EditorService } from '../editor.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'app/common/dialogs/message-dialogs/message-dialog/message-dialog.component';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnDestroy {

  private readonly onDestroy = new Subject<void>();
  user: UserDetailsGet | undefined;

  nameControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);

  fields = {
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
  readonly createNewUserValue = $localize`Create new user`

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersControllerService,
    private accountService: AccountService,
    private router: Router,
    private editorService: EditorService,
    private matDialog: MatDialog
  ) {
    route.params.pipe(
      tap(params => {
        if (params['userRef']) {
          this.load(params['userRef'])
        }
      }),
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
        this.nameControl.setValue(u.name);
        this.fields.role.setValue(u.role);
        this.fields.email.disable();
        this.nameControl.disable();

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
          role: this.fields.role.value! as 'ADMIN' | 'STAFF'
        }
      }).subscribe(updated => {
        this.editorService.onUserUpdated.emit(updated)
        this.router.navigate(['.'], { relativeTo: this.route.parent })
        this.close()
      })
    } else {
      this.usersService.postUser({
        restaurantRef: this.accountService.getRestaurantRef(),
        body: {
          email: this.fields.email.value!,
          role: this.fields.role.value! as 'ADMIN' | 'STAFF'
        }
      }).subscribe(created => {
        this.editorService.onUserUpdated.emit(created)
        this.router.navigate(['.'], { relativeTo: this.route.parent })

        const message = $localize`An email with further steps will be sent to the user.`;
        
        this.matDialog.open(MessageDialogComponent, {
          data: {message}
        })
        this.close()
      })
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
