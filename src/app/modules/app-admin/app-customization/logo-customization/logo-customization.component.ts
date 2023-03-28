import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { RestaurantDetailsGet } from '@common/api-client/models';
import { MultimediaControllerService, RestaurantControllerService } from '@common/api-client/services';

@Component({
  selector: 'app-logo-customization',
  templateUrl: './logo-customization.component.html',
  styleUrls: ['../customization-component.scss']
})
export class LogoCustomizationComponent {

  public restaurantCopy: RestaurantDetailsGet | undefined;
  public imageUrl: string | undefined;
  
  @Input() set restaurant(value: RestaurantDetailsGet) {
    this.restaurantCopy = JSON.parse(JSON.stringify(value));
    this.imageUrl = value.logo ? this.accountService.getMultimediaUrl(value.logo.ref) : undefined;
  }

  @Output('restaurantUpdate')
  updateRestaurant = new EventEmitter<RestaurantDetailsGet>();


  constructor(
    private multimediaService : MultimediaControllerService,
    private accountService: AccountService,
    private restaurantService: RestaurantControllerService
  ) {
  }

  public remove() {
    const newRestaurantConfig = {
      ... this.restaurantCopy!
    }
    newRestaurantConfig.logo = undefined;
    this.updateRestaurant.emit(newRestaurantConfig);
  }

  public upload(fileList: FileList | null) {
    if (fileList && this.restaurantCopy) {
      const file = fileList.item(0);

      let type : 'IMAGE_PNG' | 'IMAGE_JPEG';

      if (file?.type.includes('png')) {
        type = 'IMAGE_PNG';
      } else {
        type = 'IMAGE_JPEG';
      }

      if (file) {
        this.multimediaService.postMultimedia({
          type: type,
          restaurantRef: this.accountService.getRestaurantRef(),
          body: {
            file: file
          }
        }).subscribe(uploadedImage => {
          const newRestaurantConfig = {
            ... this.restaurantCopy!
          }

          newRestaurantConfig.logo = {
            ref: uploadedImage.ref
          }

          this.updateRestaurant.emit(newRestaurantConfig);
        });
      }
    }
  }
}
