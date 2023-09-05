import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@common/account-utils/services/account.service';
import { InvitationDetailsGet } from '@common/api-client/models';
import { InvitationControllerService, LoginControllerService } from '@common/api-client/services';
import { EMPTY, Subject, catchError, delay, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnDestroy {

  private readonly onDestroy = new Subject<void>();

  invitation: {
    secret: string,
    invitation: InvitationDetailsGet
  } | undefined;

  fields = {
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]),
    username: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]),
  };

  status : 'PREPARING' | 'LOADING' | 'ACTIVE' | 'CONFIRM' = 'PREPARING';


  constructor(
    private invitationService: InvitationControllerService,
    route: ActivatedRoute,
    private router: Router,
    protected accountService: AccountService,
    protected loginService: LoginControllerService
  ) {
    route.params.pipe(
      tap(params => {
        if (params['secret']) {
          this.load(params['secret']);
        }
      }),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  load(secret: string) {
    this.invitationService.getInvitation({secret}).pipe(
      tap(i => this.invitation = {
        secret: secret,
        invitation: i
      }),
      catchError(_ => { 
        this.onNotFound();
        return EMPTY;
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  onNotFound() {
    this.router.navigate(['/registration/not-found'])
  }

  register() {
    if (this.status === 'PREPARING' && !Object.values(this.fields).map(e => e.invalid).includes(true) && this.invitation) {
      this.status = 'LOADING';

      this.loginService.localRegister({
        body: {
          email: this.fields.email.value!,
          password: this.fields.password.value!,
          secret: this.invitation.secret,
          username: this.fields.username.value!
        }
      }).pipe(
        delay(2000),
        tap(e => {
          if (e.registrationStatus == 'ACTIVE') {
            this.status = 'ACTIVE';
          } else {
            this.status = 'CONFIRM';
          }
        })
      ).subscribe();
    };
  }
}
