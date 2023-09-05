import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@common/account-utils/services/account.service';
import { InvitationDetailsGet } from '@common/api-client/models';
import { InvitationControllerService } from '@common/api-client/services';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';

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


  constructor(
    private invitationService: InvitationControllerService,
    route: ActivatedRoute,
    private router: Router,
    protected accountService: AccountService
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
    if (!Object.values(this.fields).map(e => e.invalid).includes(true)) {
      
    };
  }
}
