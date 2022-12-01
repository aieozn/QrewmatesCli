import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  public getRestaurantRef() : string {
    return 'R00000000000';
  }
}
