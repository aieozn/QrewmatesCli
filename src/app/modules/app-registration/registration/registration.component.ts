import { Component, OnDestroy } from '@angular/core';
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
  invitation: InvitationDetailsGet | undefined;

  password = '';
  email = '';

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
      tap(i => {
        console.log(i)
        this.invitation = i}),
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

  }
}
