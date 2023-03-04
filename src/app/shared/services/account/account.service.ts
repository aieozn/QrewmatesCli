import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestaurantDetailsGet, RestaurantGet } from 'src/app/openapi-cli/models';
import { LoginControllerService, RestaurantControllerService } from 'src/app/openapi-cli/services';
import { GenericUtils } from '../../utils/generic-utils';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private static authDetails = 'qr-auth-details';

  constructor(private restaurantService: RestaurantControllerService, private loginController: LoginControllerService) { }

  public getRestaurantRef() : string {

    let pathParts = window.location.pathname.substring(1).split("/");
    var restaurantRef: string;

    if (pathParts[0] === "menu") {
      restaurantRef = pathParts[1]
    } else if (pathParts[0] === "staff") {
      restaurantRef = "R00000000000"
    } else {
      restaurantRef = "R00000000000"
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
    return GenericUtils.getMultimediaUrl(this.getRestaurantRef(), ref);
   }

   public getTableRef() : string {

    let pathParts = window.location.pathname.substring(1).split("/");

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
      console.log("What now?")
    });
  }

  private setStorageUser(data: AuthDetails) {
    localStorage.setItem(AccountService.authDetails, JSON.stringify(data));
  }

  private getStorageUser() : AuthDetails | null{
    let storageContent = localStorage.getItem(AccountService.authDetails);

    if (storageContent !== null) {
      return JSON.parse(storageContent);
    } else {
      return null;
    }
  }

  public isLoggedIn() : boolean {
    if (this.getStorageUser() !== null) {
      return true;
    } else {
      return false;
    }
  }

  public getUserToken() : string | null {
    let user = this.getStorageUser();

    if (user !== null) {
      return user.token;
    } else {
      return null;
    }
  }
}

interface AuthDetails {
  type: 'GOOGLE' | 'LOCAL',
  details: any,
  token: string
}