import { Injectable } from "@angular/core";
import { RestaurantDetailsGet } from "@common/api-client/models";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AdminCustomizationService {
    private restaurant = new BehaviorSubject<RestaurantDetailsGet | undefined>(undefined);
    private updated = new BehaviorSubject<boolean>(false);

    setRestaurant(restaurant: RestaurantDetailsGet) {
        this.restaurant.next(restaurant)
        this.updated.next(false);
    }

    updateRestaurant(restaurant: RestaurantDetailsGet) {
        this.restaurant.next(restaurant);
        this.updated.next(true);
    }

    getRestaurantValue() : RestaurantDetailsGet {
        return this.restaurant.getValue()!;
    }

    getRestaurant(): Observable<RestaurantDetailsGet | undefined> {
        return this.restaurant;
    }

    getUpdated(): Observable<boolean> {
        return this.updated;
    }
}