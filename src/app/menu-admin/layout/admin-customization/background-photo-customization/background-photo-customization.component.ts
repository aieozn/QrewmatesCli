import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RestaurantDetailsGet } from 'src/app/openapi-cli/models';
import { MultimediaControllerService } from 'src/app/openapi-cli/services';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-background-photo-customization',
  templateUrl: './background-photo-customization.component.html',
  styleUrls: ['../customization-component.scss']
})
export class BackgroundPhotoCustomizationComponent {
  public restaurantCopy: RestaurantDetailsGet | undefined;
  public imageUrl: string | undefined;
  
  @Input() set restaurant(value: RestaurantDetailsGet) {
    this.restaurantCopy = JSON.parse(JSON.stringify(value));
    this.imageUrl = value.backgroundImage ? this.accountService.getMultimediaUrl(value.backgroundImage.ref) : undefined;
  }

  @Output('restaurantUpdate')
  updateRestaurant = new EventEmitter<RestaurantDetailsGet>();


  constructor(
    private multimediaService : MultimediaControllerService,
    private accountService: AccountService
  ) {
  }

  public remove() {
    let newRestaurantConfig = {
      ... this.restaurantCopy!
    }
    newRestaurantConfig.backgroundImage = undefined;
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

          newRestaurantConfig.backgroundImage = {
            ref: uploadedImage.ref
          }

          this.updateRestaurant.emit(newRestaurantConfig);
        });
      }
    }
  }
}
