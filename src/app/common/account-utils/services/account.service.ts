import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginResponse, RestaurantDetailsGet, RestaurantGet } from '../../api-client/models';
import { LoginControllerService, RestaurantControllerService } from '../../api-client/services';
import { ActiveUser } from '../model/active-user.interface';

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

  getRestaurantRef() : string {

    const pathParts = window.location.pathname.substring(1).split("/");

    if (pathParts[0] === "menu") {
      return pathParts[1]
    } else {
      const activeRestaurant = this.getActiveUserOrLogin().activeRestaurant;

      if (activeRestaurant !== undefined) {
        return activeRestaurant;
      } else {
        this.unauthorized();
        throw 'Unauthorized';
      }
    }
  }

  logout() {
    this.clearStorageUser();
    this.unauthorized();
  }

  getRestaurant() : Observable<RestaurantGet> {
    return this.restaurantService.getRestaurant({
      restaurantRef: this.getRestaurantRef()
    });
  }

  getRestaurantDetails() : Observable<RestaurantDetailsGet> {
    return this.restaurantService.getRestaurantDetails({
      restaurantRef: this.getRestaurantRef()
    });
  }

  getMultimediaUrl(ref: string) {
    return this.getMultimediaImplementation(this.getRestaurantRef(), ref);
  }

  getTableRef() : string {

    console.log("GET TABLE REF")

    const pathParts = window.location.pathname.substring(1).split("/");

    if (pathParts[0] === "menu") {
        return window.location.pathname.substring(1).split("/")[2];
    } else {
        throw 'Table ref not found. Use only for cli';
    }
  }

  loginAs(user: SocialUser) {
    return this.loginController.socialLogin({
      body: {
        provider: 'GOOGLE',
        token: user.idToken
      }
    }).pipe(
      tap(e => this.onLoginSuccess(e)),
    );
  }

  login(email: string, password: string) : Observable<LoginResponse> {
    return this.loginController.localLogin({
      body: {
        email: email,
        password: password
      }
    }).pipe(
      tap(e => this.onLoginSuccess(e))
    );
  }

  selectRestaurant(ref: string) {
    const activeUser = this.getActiveUserOrLogin();
    this.setStorageUser(activeUser, ref);
    this.redirectBasedOnPrivilages(activeUser, ref);
  }

  private setStorageUser(data: LoginResponse, activeRestaurant: string | undefined) {
    localStorage.setItem(AccountService.authDetails, JSON.stringify({
      ...data,
      activeRestaurant: activeRestaurant
    }));
  }

  private getStorageUser() : ActiveUser | null {
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

  isLoggedIn() : boolean {
    if (this.getStorageUser() !== null) {
      return true;
    } else {
      return false;
    }
  }

  getActiveUserOrLogin() : ActiveUser {
    const user = this.getStorageUser();

    if (user !== null && user.expiration > new Date().getTime()) {
      return user;
    } else {
      this.clearStorageUser();
      this.unauthorized();
      throw 'Unauthorized';
    }
  }

  getActiveUser() : ActiveUser | null {
    const user = this.getStorageUser();

    if (user !== null && user.expiration > new Date().getTime()) {
      return user;
    } else {
      this.clearStorageUser();
      return null;
    }
  }

  // Execute this method if request is not authorized. It redirects user to login endpoint
  unauthorized() {
    window.location.href = '/login';
  }

  private getMultimediaImplementation(restaurantRef: string, ref: string) {
    return `/api/public/v1/restaurant/${restaurantRef}/multimedia/${ref}`;
  }

  onLoginSuccess(loginResponse: LoginResponse) {
    if (loginResponse.restaurants.length === 1) {
      this.setStorageUser(loginResponse, loginResponse.restaurants[0].ref);
      this.redirectBasedOnPrivilages(loginResponse, loginResponse.restaurants[0].ref)
    } else {
      this.setStorageUser(loginResponse, undefined)
      this.router.navigate(['login', 'select-organization']);
    }
  }

  private redirectBasedOnPrivilages(loginResponse: LoginResponse, restaurantRef: string) {
    const restaurantRole = loginResponse.restaurants.filter(e => e.ref === restaurantRef)[0].role;

    if (['OWNER', 'ADMIN'].includes(restaurantRole)) {
      this.router.navigate(['admin']);
    } else if (restaurantRole === 'STAFF') {
      this.router.navigate(['staff']);
    } else {
      throw 'Unkwnown privilages'
    }
  }
}