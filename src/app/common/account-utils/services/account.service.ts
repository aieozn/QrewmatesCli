import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, tap } from 'rxjs';
import { LoginResponse, RestaurantDetailsGet, RestaurantGet, UserRestaurant } from '../../api-client/models';
import { LoginControllerService, RestaurantControllerService } from '../../api-client/services';
import { ActiveUser } from '../model/active-user.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private static authDetails = 'qr-auth-details';

  private static userAppsEndpoints = ["table-order"];

  constructor(
    private restaurantService: RestaurantControllerService,
    private loginController: LoginControllerService,
    private router: Router
  ) { }

  getRestaurantRef() : string {
    const pathParts = window.location.pathname.substring(1).split("/");

    if (AccountService.userAppsEndpoints.includes(pathParts[0])) {
      return pathParts[1]
    } else {
      const activeRestaurant = this.getUserOrLogin().activeRestaurant;

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

  getRestaurantMultimedia(restaurantRef: string, ref: string) {
    return this.getMultimediaImplementation(restaurantRef, ref);
  }

  getTableRef() : string {
    const pathParts = window.location.pathname.substring(1).split("/");

    if (AccountService.userAppsEndpoints.includes(pathParts[0])) {
        return window.location.pathname.substring(1).split("/")[2];
    } else {
        throw 'Table ref not found. Use only for cli';
    }
  }

  loginAs(user: SocialUser, secret: string | undefined) {
    return this.loginController.socialLogin({
      body: {
        provider: 'GOOGLE',
        token: user.idToken,
        secret: secret
      }
    }).pipe(
      tap(e => this.onLoginSuccess(e)),
    ).subscribe();
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

  loginAndRedirectToInvitation(email: string, password: string, secret: string) : Observable<LoginResponse> {
    return this.loginController.localLogin({
      body: {
        email: email,
        password: password
      }
    }).pipe(
      tap(e => this.goToInvitation(e, secret))
    );
  }

  selectRestaurant(ref: string) {
    const activeUser = this.getUserOrLogin();
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

  getUserOrLogin() : ActiveUser {
    const user = this.getStorageUser();

    if (user !== null) {
      return user;
    } else {
      this.clearStorageUser();
      this.unauthorized();
      throw 'Unauthorized';
    }
  }

  refreshToken(user: ActiveUser) : Observable<ActiveUser> {
    return this.loginController.refreshToken({
      body: {
        refreshToken: user.refreshToken
      }
    }).pipe(
      tap(e => this.setStorageUser(e, user.activeRestaurant)),
      map(e => ({
        ...e,
        activeRestaurant: user.activeRestaurant
      })),
      catchError(e => {
        // Handle this exception
        this.unauthorized();
        throw e;
      })
    );
  }

  getUserInitials(userName: string) : string {
    const userNameParts = userName.split(/\s+/).filter(e => e !== '');

    if (userNameParts.length === 0) {
      return '?';
    } else if (userNameParts.length === 1) {
      return userNameParts[0][0];
    } else {
      return userNameParts[0][0] + userNameParts[1][0];
    }
  }

  getUser() : ActiveUser | null {
    const user = this.getStorageUser();

    if (user !== null) {
      return user;
    } else {
      this.clearStorageUser();
      return null;
    }
  }

  // Execute this method if request is not authorized. It redirects user to login endpoint
  unauthorized() {
    debugger;
    this.clearStorageUser();
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
      this.navigateToSelectOrganization()
    }
  }

  goToInvitation(loginResponse: LoginResponse, secret: string) {
    this.setStorageUser(loginResponse, loginResponse.restaurants[0].ref);
    this.router.navigate(['/registration/invitation', secret]);
  }

  private redirectBasedOnPrivilages(loginResponse: LoginResponse, restaurantRef: string) {
    const restaurantRole = loginResponse.restaurants.filter(e => e.ref === restaurantRef)[0];
    this.redirectByRole(restaurantRole);
  }

  private redirectByRole(restaurant: UserRestaurant) {
    this.getUserOrLogin().activeRestaurant = restaurant.ref;

    if (['OWNER', 'ADMIN'].includes(restaurant.role)) {
      this.router.navigate(['admin']);
    } else if (restaurant.role === 'STAFF') {
      this.router.navigate(['staff']);
    } else {
      throw 'Unkwnown privilages'
    }
  }

  public redirectToMainPage() {
    const user = this.getUserOrLogin();

    if (user.restaurants.length > 1 || user.restaurants.length == 0) {
      this.navigateToSelectOrganization()
    } else {
      const restaurantRole = user.restaurants[0];
      this.redirectByRole(restaurantRole);
    }
  }

  private navigateToSelectOrganization() {
    this.router.navigate(['login', 'select-organization']);
  }
}