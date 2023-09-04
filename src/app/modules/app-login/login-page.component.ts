import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnDestroy } from '@angular/core';
import { EMPTY, Subject, catchError, takeUntil, tap } from 'rxjs';
import { AccountService } from '@common/account-utils/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitationControllerService } from '@common/api-client/services';
import { InvitationDetailsGet } from '@common/api-client/models';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnDestroy {

  isLogged = true;
  password = '';
  email = '';
  showErrorMessage = false;
  invitation: {
    secret: string,
    invitation: InvitationDetailsGet
  } | undefined;
  
  private readonly onDestroy = new Subject<void>();

  constructor(
    private authService: SocialAuthService,
    protected accountService: AccountService,
    private router: Router,
    private invitationService: InvitationControllerService,
    route: ActivatedRoute
  ) {
    this.isLogged = accountService.isLoggedIn();

    this.authService.authState.pipe(
      takeUntil(this.onDestroy)
    ).subscribe({
      error: () => {
        // TODO show error message that matches reason
        this.showErrorMessage = true;
      }
    });

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
      tap(i => {
        this.invitation = {
          secret: secret,
          invitation: i
        }

        if (this.accountService.isLoggedIn()) {
          this.router.navigate(['/registration/invitation', secret]);
        }
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

  login() {
    if (this.invitation) {
      this.loginForInvitation(this.invitation);
    } else {
      this.defaultLogin();
    }
  }

  loginForInvitation(invitation: {
    secret: string,
    invitation: InvitationDetailsGet
  }) {
    this.accountService.loginAndRedirectToInvitation(this.email, this.password, invitation.secret)
    .subscribe({
      error: () => {
        this.showErrorMessage = true
      }
    })
  }

  defaultLogin() {
    this.accountService.login(this.email, this.password)
    .subscribe({
      error: () => {
        this.showErrorMessage = true
      }
    })
  }

  onNotFound() {
    this.router.navigate(['/registration/not-found'])
  }
}
