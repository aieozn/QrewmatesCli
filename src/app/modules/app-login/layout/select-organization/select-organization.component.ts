import { Component } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { LoginResponse, UserRestaurant } from '@common/api-client/models';

@Component({
  selector: 'app-select-organization',
  templateUrl: './select-organization.component.html',
  styleUrls: ['./select-organization.component.scss']
})
export class SelectOrganizationComponent {

  activeUser: LoginResponse;

  constructor(private accountService: AccountService) {
    this.activeUser = this.accountService.getUserOrLogin()
  }

  activate(userRestaurant: UserRestaurant) {
    this.accountService.selectRestaurant(userRestaurant.ref);
  }
}
