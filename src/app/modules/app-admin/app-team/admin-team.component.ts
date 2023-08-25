import { Component } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { UserDetailsGet } from '@common/api-client/models';
import { UsersControllerService } from '@common/api-client/services';
import { tap } from 'rxjs';

@Component({
  selector: 'app-admin-team',
  templateUrl: './admin-team.component.html',
  styleUrls: ['./admin-team.component.scss']
})
export class AdminTeamComponent {

  users: UserDetailsGet[] = [];

  administrators = $localize`Administrators`
  staff = $localize`Staff`

  constructor(private usersService: UsersControllerService, accountService: AccountService) {
    usersService.getUsers({
      restaurantRef: accountService.getRestaurantRef()
    }).pipe(
      tap(u => this.users = u)
    ).subscribe();
  }
}
