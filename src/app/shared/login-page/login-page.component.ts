import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AccountService } from '../services/account/account.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnDestroy {

  public isLogged = true;
  private readonly onDestroy = new Subject<void>();

  constructor(private authService: SocialAuthService, accountService: AccountService) {
    this.isLogged = accountService.isLoggedIn();
    this.authService.authState.pipe(
      takeUntil(this.onDestroy)
    ).subscribe((user) => {
      accountService.loginAs(user)
    });
  }

  refreshToken(): void {
    console.log("Refreshing token")
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

}
