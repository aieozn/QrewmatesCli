import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@common/account-utils/services/account.service';
import { InvitationDetailsGet } from '@common/api-client/models';
import { InvitationControllerService } from '@common/api-client/services';
import { Translators } from 'app/common/translators';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-invitation-form',
  templateUrl: './invitation-form.component.html',
  styleUrls: ['./invitation-form.component.scss']
})
export class InvitationFormComponent implements OnDestroy {

  invitation: {
    secret: string,
    invitation: InvitationDetailsGet
  } | undefined;

  private readonly onDestroy = new Subject<void>();
  protected translator = Translators
  
  constructor(
    protected accountService: AccountService,
    private invitationService: InvitationControllerService,
    route: ActivatedRoute,
    private router: Router
  ) {
    accountService.getUserOrLogin()

    route.params.pipe(
      tap(params => {
        if (params['secret']) {
          this.load(params['secret']);
        }
      }),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
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

  onNotFound() {
    this.router.navigate(['/registration/not-found'])
  }

  accept(invitation: {
    secret: string,
    invitation: InvitationDetailsGet
  }) {
    this.invitationService.acceptInvitation({
      secret: invitation.secret
    }).pipe(
      tap(e => this.accountService.onLoginSuccess(e))
    ).subscribe();
  }

  reject(invitation: {
    secret: string,
    invitation: InvitationDetailsGet
  }) {
    this.invitationService.rejectInvitation({
      secret: invitation.secret
    }).pipe(
      tap(_ => this.accountService.redirectToMainPage())
    ).subscribe()
  }
}
