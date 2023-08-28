import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { UserDetailsGet } from '@common/api-client/models';
import { UsersControllerService } from '@common/api-client/services';
import { Subject, takeUntil, tap } from 'rxjs';
import { EditorService } from './editors/editor.service';

@Component({
  selector: 'app-admin-team',
  templateUrl: './admin-team.component.html',
  styleUrls: ['./admin-team.component.scss']
})
export class AdminTeamComponent implements OnDestroy {

  private readonly onDestroy = new Subject<void>();
  
  users: UserDetailsGet[] = [];

  administrators = $localize`Administrators`
  staff = $localize`Staff`

  constructor(
    usersService: UsersControllerService,
    accountService: AccountService,
    editorService: EditorService
  ) {
    usersService.getUsers({
      restaurantRef: accountService.getRestaurantRef()
    }).pipe(
      tap(u => this.users = u)
    ).subscribe();


    editorService.onUserUpdated.pipe(
      tap(updated => {
        this.users = this.users.filter(u => u.ref !== updated.ref);
        this.users.push(updated);
      }),
      takeUntil(this.onDestroy)
    ).subscribe();
  }
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
