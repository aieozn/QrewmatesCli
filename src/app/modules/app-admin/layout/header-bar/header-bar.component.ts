import { Component } from '@angular/core';
import { CollectiveChangesService } from '../../services/collective-changes/collective-changes.service';
import { AccountService } from '@common/account-utils/services/account.service';
import { ActiveUser } from '@common/account-utils/model/active-user.interface';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent {

  user: ActiveUser | undefined;

  constructor(public collectiveChangesService: CollectiveChangesService, private accountService: AccountService) {
    this.user = this.accountService.getActiveUserOrLogin();
  }

  publish() {
    this.collectiveChangesService.publish.next();
  }
}
