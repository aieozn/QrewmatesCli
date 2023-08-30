import { EventEmitter, Injectable } from '@angular/core';
import { InvitationGet, UserDetailsGet } from '@common/api-client/models';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  onUserUpdated = new EventEmitter<UserDetailsGet>();
  onInvitationCreated = new EventEmitter<InvitationGet>();
  onInvitationDeleted = new EventEmitter<string>();
}
