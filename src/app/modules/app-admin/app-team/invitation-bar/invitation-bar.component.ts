import { Component, Input } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { InvitationGet } from '@common/api-client/models';
import { InvitationControllerService } from '@common/api-client/services';
import { tap } from 'rxjs';
import { EditorService } from '../editors/editor.service';

@Component({
  selector: 'app-invitation-bar',
  templateUrl: './invitation-bar.component.html',
  styleUrls: ['./invitation-bar.component.scss']
})
export class InvitationBarComponent {

  invitation: InvitationGet | undefined;

  constructor(
    private invitationService: InvitationControllerService,
    private accountService: AccountService,
    private editorService: EditorService
  ) {

  }

  @Input('invitation') set setInvitation(value: InvitationGet) {
    this.invitation = value;
  }

  @Input('enabled') enabled = true;

  delete(ref: string) {
    if (confirm($localize`Are you sure you want to delete this invitation?`)) {
      this.invitationService.deleteInvitation({
        restaurantRef: this.accountService.getRestaurantRef(),
        invitationRef: ref
      }).pipe(
        tap(_ => this.editorService.onInvitationDeleted.emit(ref))
      ).subscribe();
    }
  }
}
