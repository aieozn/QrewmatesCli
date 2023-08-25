import { Component, Input } from '@angular/core';
import { UserGet } from '@common/api-client/models';

@Component({
  selector: 'app-account-icon',
  templateUrl: './account-icon.component.html',
  styleUrls: ['./account-icon.component.scss']
})
export class AccountIconComponent {
  user: UserGet | undefined;

  userInitials: string | undefined;

  @Input() backgroundColor = '#c21d8e';
  @Input() fontColor = '#FFFFFF';
  @Input() size = 40;

  @Input('user') set setUser(value: UserGet) {
    this.user = value;

    const userName = this.user.name;
    const userNameParts = userName.split(/\s+/).filter(e => e !== '');

    if (userNameParts.length === 0) {
      this.userInitials = '?';
    } else if (userNameParts.length === 1) {
      this.userInitials = userNameParts[0][0];
    } else {
      this.userInitials = userNameParts[0][0] + userNameParts[1][0];
    }
  }
}
