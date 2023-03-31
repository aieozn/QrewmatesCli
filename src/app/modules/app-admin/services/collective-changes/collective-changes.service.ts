import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectiveChangesService {
  modified = new BehaviorSubject<boolean>(false);
  publish = new Subject<void>();
}
