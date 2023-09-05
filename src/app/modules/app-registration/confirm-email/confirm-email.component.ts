import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '@common/account-utils/services/account.service';
import { LoginControllerService } from '@common/api-client/services';
import { EMPTY, Subject, catchError, takeUntil, tap, delay } from 'rxjs';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnDestroy {
  status : 'PREPARING' | 'LOADING' | 'ACTIVE' | 'ERROR' = 'PREPARING';

  private readonly onDestroy = new Subject<void>();

  constructor(
    route: ActivatedRoute,
    accountService: AccountService,
    private loginService: LoginControllerService
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

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  load(secret: string) {
    this.status = 'LOADING';

    this.loginService.localActivate({
      body: {secret}
    }).pipe(
      delay(3000),
      tap(_ => this.status = 'ACTIVE'),
      catchError(_ => { 
        this.status = 'ERROR';
        return EMPTY;
      })
    ).subscribe();
  }

}
