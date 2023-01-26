import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RestaurantDetailsGet } from 'src/app/openapi-cli/models';
import { RestaurantControllerService, UploadMultimediaControllerService } from 'src/app/openapi-cli/services';
import { AccountService } from 'src/app/shared/services/account/account.service';

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
    private multimediaService : UploadMultimediaControllerService,
    private accountService: AccountService,
    private restaurantService: RestaurantControllerService
  ) {
  }

  public remove() {
    let newRestaurantConfig = {
      ... this.restaurantCopy!
    }
    newRestaurantConfig.logo = undefined;
    this.updateRestaurant.emit(newRestaurantConfig);
  }

  public upload(fileList: FileList | null) {
    if (fileList && this.restaurantCopy) {
      let file = fileList.item(0);

      var type : 'IMAGE_PNG' | 'IMAGE_JPEG';

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
          let newRestaurantConfig = {
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
