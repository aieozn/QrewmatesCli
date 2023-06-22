import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@common/account-utils/services/account.service';
import { QrCodeConfigGet } from '@common/api-client/models';
import { QrCodeConfigControllerService, RestaurantControllerService } from '@common/api-client/services';
import { tap } from 'rxjs';
import { AdminCustomizationService } from '../../admin-customization.service';

@Component({
  selector: 'app-edit-theme',
  templateUrl: './edit-theme.component.html',
  styleUrls: ['./edit-theme.component.scss']
})
export class EditThemeComponent {

  configs: QrCodeConfigGet[] = [];
  selected: QrCodeConfigGet | undefined;
  updted = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private qrConfigService: QrCodeConfigControllerService,
    private restaurantService: RestaurantControllerService,
    private customizationService: AdminCustomizationService
  ) {
    this.accountService.getRestaurantDetails().pipe(
      tap(r => r.qrCodeConfig.qrCodeMode)
    ).subscribe()

    this.qrConfigService.getConfigs({
      restaurantRef: this.accountService.getRestaurantRef()
    }).pipe(
      tap(e => this.configs = e)
    ).subscribe();
    
    this.restaurantService.getRestaurantDetails({
      restaurantRef: this.accountService.getRestaurantRef()
    }).pipe(
      tap(e => this.selected = e.qrCodeConfig)
    ).subscribe();
  }

  close() {
    this.router.navigate(['.'], {relativeTo: this.route.parent})
  }

  getConfigPreviewUrl(ref: string) {
    return this.accountService.getMultimediaUrl(ref);
  }

  select(config: QrCodeConfigGet) {
    this.selected = config;
    this.updted = true;
  }

  onSave() {
    const restaurant = this.customizationService.getRestaurantValue()

    restaurant!.qrCodeConfig = this.selected!
    this.customizationService.updateRestaurant(restaurant);

    this.close()
  }
}
