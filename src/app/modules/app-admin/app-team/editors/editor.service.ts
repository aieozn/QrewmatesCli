import { EventEmitter, Injectable } from '@angular/core';
import { UserDetailsGet } from '@common/api-client/models';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  onUserUpdated = new EventEmitter<UserDetailsGet>();

  constructor() {
    
  }
}
