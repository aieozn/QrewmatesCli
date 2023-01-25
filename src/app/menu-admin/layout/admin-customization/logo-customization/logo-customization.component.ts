import { Component } from '@angular/core';
import { switchMap } from 'rxjs';
import { RestaurantControllerService, UploadMultimediaControllerService } from 'src/app/openapi-cli/services';

@Component({
  selector: 'app-logo-customization',
  templateUrl: './logo-customization.component.html',
  styleUrls: ['./logo-customization.component.scss']
})
export class LogoCustomizationComponent {

  constructor(
    private multimediaService : UploadMultimediaControllerService,
    private restaurantService: RestaurantControllerService
  ) {

  }

  public upload(fileList: FileList | null) {
    console.log(fileList);

    // if (fileList) {
    //   let file = fileList.item(0);

    //   var type : 'IMAGE_PNG' | 'IMAGE_JPEG';

    //   if (file?.type.includes('png')) {
    //     type = 'IMAGE_PNG';
    //   } else {
    //     type = 'IMAGE_JPEG';
    //   }

    //   if (file) {
    //     this.multimediaService.postMultimedia({
    //       type: type,
    //       restaurantRef: 'R00000000000',
    //       body: {
    //         file: file
    //       }
    //     })
    //     .pipe(
    //       switchMap(imageDescriptor => {
    //         this.restaurantService.putRestaurant()
    //       })
    //     ).subscribe(apiResponse => {
    //       console.log("Uploaded file");
    //       console.log(apiResponse);
    //     })
    //   }
    // }
  }
}
