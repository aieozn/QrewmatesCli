import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RestaurantDetailsGet } from 'src/app/openapi-cli/models';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-admin-customization',
  templateUrl: './admin-customization.component.html',
  styleUrls: ['./admin-customization.component.scss']
})
export class AdminCustomizationComponent {

  public restaurant: Observable<RestaurantDetailsGet>;

  public constructor(private accountService: AccountService) {
    this.restaurant = accountService.getRestaurantDetails();
  }

  public restaurantUpdated() {

  }
}
