import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginResponse, RestaurantDetailsGet, RestaurantGet } from '../../api-client/models';
import { LoginControllerService, RestaurantControllerService } from '../../api-client/services';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private static authDetails = 'qr-auth-details';

  constructor(
    private restaurantService: RestaurantControllerService,
    private loginController: LoginControllerService,
    private router: Router
  ) { }

  public getRestaurantRef() : string {

    const pathParts = window.location.pathname.substring(1).split("/");
    let restaurantRef: string;

    if (pathParts[0] === "menu") {
      restaurantRef = pathParts[1]
    } else if (pathParts[0] === "staff") {
      restaurantRef = "R0TAXI000000"
    } else {
      restaurantRef = "R0TAXI000000"
    }


    return restaurantRef;
  }

  public getRestaurant() : Observable<RestaurantGet> {
    return this.restaurantService.getRestaurant({
      restaurantRef: this.getRestaurantRef()
    });
  }

  public getRestaurantDetails() : Observable<RestaurantDetailsGet> {
    return this.restaurantService.getRestaurantDetails({
      restaurantRef: this.getRestaurantRef()
    });
  }

  public getMultimediaUrl(ref: string) {
    return this.getMultimediaImplementation(this.getRestaurantRef(), ref);
  }

  public getTableRef() : string {

    const pathParts = window.location.pathname.substring(1).split("/");

    if (pathParts[0] === "menu") {
        return window.location.pathname.substring(1).split("/")[2];
    } else {
        throw 'Table ref not found. Use only for cli';
    }
  }

  public loginAs(user: SocialUser) {
    console.log("Login as:")
    console.log(user)
    this.loginController.socialLogin({
      body: {
        provider: 'GOOGLE',
        token: user.idToken
      }
    }).subscribe(e => {
      this.setStorageUser(e);
    });
  }

  private setStorageUser(data: LoginResponse) {
    localStorage.setItem(AccountService.authDetails, JSON.stringify(data));
  }

  private getStorageUser() : LoginResponse | null {
    const storageContent = localStorage.getItem(AccountService.authDetails);

    if (storageContent !== null) {
      return JSON.parse(storageContent);
    } else {
      return null;
    }
  }

  private clearStorageUser() {
    localStorage.removeItem(AccountService.authDetails);
  }

  public isLoggedIn() : boolean {
    if (this.getStorageUser() !== null) {
      return true;
    } else {
      return false;
    }
  }

  public getActiveUser() : LoginResponse | null {
    const user = this.getStorageUser();

    if (user !== null && user.expiration > new Date().getTime()) {
      return user;
    } else {
      this.clearStorageUser();
      return null;
    }
  }

  // Execute this method if request is not authorized. It redirects user to login endpoint
  public unauthorized() {
    window.location.href = '/login';
  }

  private getMultimediaImplementation(restaurantRef: string, ref: string) {
    return `/api/public/v1/restaurant/${restaurantRef}/multimedia/${ref}`;
  }
}