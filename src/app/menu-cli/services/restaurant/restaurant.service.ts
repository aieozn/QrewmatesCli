import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { RestaurantGet } from 'src/app/openapi-cli/models/restaurant-get';
import { RestaurantControllerService } from 'src/app/openapi-cli/services/restaurant-controller.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private restaurant: RestaurantGet | undefined;
  private restaurantRef: string;

  constructor(
    private restaurantControllerService: RestaurantControllerService
  ) {
    this.restaurantRef = window.location.pathname.substring(1).split("/")[0]
  }

  public getRestaurantRef(): string {
    return this.restaurantRef;
  }

  public async getRestaurant() : Promise<RestaurantGet> {
    if (this.restaurant !== undefined) {
      return this.restaurant;
    }

    this.restaurant = await firstValueFrom(this.restaurantControllerService.getRestaurant({
      "restaurant": this.restaurantRef
    }));

    return this.restaurant;
  }

  public getMultimediaUrl(ref: string) {
    return  "/api/multimedia/" + this.getRestaurantRef() + "/" + ref;
  }
}
