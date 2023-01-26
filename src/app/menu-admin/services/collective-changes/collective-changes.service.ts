import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectiveChangesService {

  public modified = new BehaviorSubject<boolean>(false);
  public publish = new Subject<void>();

  constructor() { }
}
