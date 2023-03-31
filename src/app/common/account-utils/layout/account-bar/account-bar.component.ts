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
    this.activeUser = accountService.getActiveUserOrLogin();
    const userName = this.activeUser.userName;
    const userNameParts = userName.split(/\s+/).filter(e => e !== '');

    if (userNameParts.length === 0) {
      this.userInitials = '?';
    } else if (userNameParts.length === 1) {
      this.userInitials = userNameParts[0][0];
    } else {
      this.userInitials = userNameParts[0][0] + userNameParts[1][0];
    }
  }

  logout() {
    this.accountService.logout();
  }
}
