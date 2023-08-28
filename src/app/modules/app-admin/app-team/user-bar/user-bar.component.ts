import { Component, Input } from '@angular/core';
import { UserDetailsGet } from '@common/api-client/models';

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.scss']
})
export class UserBarComponent {

  user: UserDetailsGet | undefined;

  @Input('user') set setUser(value: UserDetailsGet) {
    this.user = value;
  }

  @Input('enabled') enabled = true;
}
