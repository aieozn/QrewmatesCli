import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestaurantDetailsGet, RestaurantGet } from 'src/app/openapi-cli/models';
import { RestaurantControllerService } from 'src/app/openapi-cli/services';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private restaurantService: RestaurantControllerService) { }

  public getRestaurantRef() : string {

    let pathParts = window.location.pathname.substring(1).split("/");
    var restaurantRef: string;
    var tableRef: string

    if (pathParts[0] === "menu") {
      restaurantRef = pathParts[1]
      tableRef = window.location.pathname.substring(1).split("/")[2];
    } else if (pathParts[0] === "staff") {
      restaurantRef = "R00000000000"
      tableRef = '';
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
}
