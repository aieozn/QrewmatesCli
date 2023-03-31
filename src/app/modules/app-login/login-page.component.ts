import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AccountService } from '@common/account-utils/services/account.service';
import { Router } from '@angular/router';

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
  private readonly onDestroy = new Subject<void>();

  constructor(private authService: SocialAuthService, private accountService: AccountService, private router: Router) {
    this.isLogged = accountService.isLoggedIn();
    this.authService.authState.pipe(
      takeUntil(this.onDestroy)
    ).subscribe({
      error: () => {
        // TODO show error message that matches reason
        this.showErrorMessage = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  login() {
    this.accountService.login(this.email, this.password)
    .subscribe({
      error: () => {
        this.showErrorMessage = true
      }
    })
  }

}
