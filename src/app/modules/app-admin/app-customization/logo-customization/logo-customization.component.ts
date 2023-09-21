import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { RestaurantDetailsGet } from '@common/api-client/models';
import { MultimediaControllerService, RestaurantControllerService } from '@common/api-client/services';
import { AdminCustomizationService } from '../admin-customization.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-logo-customization',
  templateUrl: './logo-customization.component.html',
  styleUrls: ['../customization-component.scss']
})
export class LogoCustomizationComponent implements OnDestroy {

  private readonly onDestroy = new Subject<void>();
  imageUrl: string | undefined;
  
  updateRestaurant(value: RestaurantDetailsGet | undefined) {
    this.imageUrl = value?.theme.logo ? this.accountService.getMultimediaUrl(value.theme.logo.ref) : undefined;
  }

  constructor(
    private multimediaService : MultimediaControllerService,
    private accountService: AccountService,
    private customizationService: AdminCustomizationService
  ) {
    customizationService.getRestaurant().pipe(
      tap(e => this.updateRestaurant(e)),
      takeUntil(this.onDestroy)
    ).subscribe()
  }

  remove() {
    const newRestaurantConfig = this.customizationService.getRestaurantValue()
    newRestaurantConfig.theme.logo = undefined;
    this.customizationService.updateRestaurant(newRestaurantConfig);
  }

  upload(fileList: FileList | null) {
    if (fileList) {
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
          const newRestaurantConfig = this.customizationService.getRestaurantValue()

          newRestaurantConfig.theme.logo = {
            ref: uploadedImage.ref
          }

          this.customizationService.updateRestaurant(newRestaurantConfig);
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
