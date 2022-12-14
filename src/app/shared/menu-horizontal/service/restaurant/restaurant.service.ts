import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { RestaurantGet } from 'src/app/openapi-cli/models/restaurant-get';
import { RestaurantControllerService } from 'src/app/openapi-cli/services/restaurant-controller.service';
import { GenericUtils } from 'src/app/shared/utils/generic-utils';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private restaurant: RestaurantGet | undefined;
  private restaurantRef: string;
  private tableRef: string;

  constructor(
    private restaurantControllerService: RestaurantControllerService
  ) {
    let pathParts = window.location.pathname.substring(1).split("/");

    if (pathParts[0] === "menu") {
      this.restaurantRef = pathParts[1]
      this.tableRef = window.location.pathname.substring(1).split("/")[2];
    } else if (pathParts[0] === "staff") {
      this.restaurantRef = "R00000000000"
      this.tableRef = '';
    } else {
      throw "Unknown path";
    }
  }

  public getRestaurantRef(): string {
    return this.restaurantRef;
  }

  public getTableRef() : string {
    return this.tableRef;
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
   return GenericUtils.getMultimediaUrl(this.getRestaurantRef(), ref);
  }
}
