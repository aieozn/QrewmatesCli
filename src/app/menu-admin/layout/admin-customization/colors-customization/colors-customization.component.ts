import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RestaurantDetailsGet } from 'src/app/openapi-cli/models';
import { UploadMultimediaControllerService } from 'src/app/openapi-cli/services';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-colors-customization',
  templateUrl: './colors-customization.component.html',
  styleUrls: ['../customization-component.scss']
})
export class ColorsCustomizationComponent {
  public restaurantCopy: RestaurantDetailsGet | undefined;
  public activeColor: string | undefined;

  constructor(
    private multimediaService : UploadMultimediaControllerService,
    private accountService: AccountService
  ) {
  }
  
  @Input() set restaurant(value: RestaurantDetailsGet) {
    this.restaurantCopy = JSON.parse(JSON.stringify(value));
    this.activeColor = value.themeMainColor;
  }

  @Output('restaurantUpdate')
  updateRestaurant = new EventEmitter<RestaurantDetailsGet>();

}
