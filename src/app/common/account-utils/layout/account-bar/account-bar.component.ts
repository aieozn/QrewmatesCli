import { Component } from '@angular/core';
import { ActiveUser } from '@common/account-utils/model/active-user.interface';
import { AccountService } from '@common/account-utils/services/account.service';

@Component({
  selector: 'app-account-bar',
  templateUrl: './account-bar.component.html',
  styleUrls: ['./account-bar.component.scss']
})
export class AccountBarComponent {
  activeUser: ActiveUser;
  userInitials: string;

  constructor(private accountService: AccountService) {
    this.activeUser = accountService.getUserOrLogin();
    this.userInitials = accountService.getUserInitials(this.activeUser.name);
  }

  logout() {
    this.accountService.logout();
  }
}
