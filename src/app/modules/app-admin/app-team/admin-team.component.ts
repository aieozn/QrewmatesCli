import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { InvitationGet, UserDetailsGet } from '@common/api-client/models';
import { InvitationControllerService, UserControllerService } from '@common/api-client/services';
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
  invitations: InvitationGet[] = [];

  administrators = $localize`Administrators`
  staff = $localize`Staff`

  constructor(
    usersService: UserControllerService,
    invitationsService: InvitationControllerService,
    accountService: AccountService,
    editorService: EditorService
  ) {
    usersService.getUsers({
      restaurantRef: accountService.getRestaurantRef()
    }).pipe(
      tap(u => this.users = u)
    ).subscribe();

    invitationsService.getInvitations({
      restaurantRef: accountService.getRestaurantRef()
    }).pipe(
      tap(i => this.invitations = i)
    ).subscribe();

    editorService.onInvitationDeleted.pipe(
      tap(deleted => {
        this.invitations = this.invitations.filter(i => i.ref !== deleted)
      }),
      takeUntil(this.onDestroy)
    ).subscribe();

    editorService.onInvitationCreated.pipe(
      tap(created => {
        this.invitations.push(created)
        this.invitations = [...this.invitations]
      }),
      takeUntil(this.onDestroy)
    ).subscribe();

    editorService.onUserUpdated.pipe(
      tap(updated => {
        const found = this.users.filter(u => u.ref === updated.ref);

        if (found.length === 1) {
          Object.assign(found[0], updated)
        }

        this.users = [...this.users]
      }),
      takeUntil(this.onDestroy)
    ).subscribe();

    editorService.onUserDeleted.pipe(
      tap(deleted => {
        this.users = this.users.filter(u => u.ref !== deleted);
      }),
      takeUntil(this.onDestroy)
    ).subscribe();
  }
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
