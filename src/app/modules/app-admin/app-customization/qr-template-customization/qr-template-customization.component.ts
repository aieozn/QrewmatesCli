import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '@common/account-utils/services/account.service';
import { RestaurantDetailsGet } from '@common/api-client/models';
import { Subject, takeUntil, tap } from 'rxjs';
import { AdminCustomizationService } from '../admin-customization.service';

@Component({
  selector: 'app-qr-template-customization',
  templateUrl: './qr-template-customization.component.html',
  styleUrls: ['../customization-component.scss', './qr-template-customization.component.scss']
})
export class QrTemplateCustomizationComponent implements OnDestroy {

  private readonly onDestroy = new Subject<void>();

  templatePreviewUrl: string | undefined;
  qrCodeDescription: string | undefined;
  
  updateRestaurant(value: RestaurantDetailsGet | undefined) {
    this.qrCodeDescription = value?.qrCodeConfig.description;
    this.templatePreviewUrl = value ? this.accountService.getMultimediaUrl(value.qrCodeConfig.preview.ref) : undefined;
  }

  constructor(
    public dialog: MatDialog,
    private accountService: AccountService,
    private customizationService: AdminCustomizationService
  ) {
    customizationService.getRestaurant().pipe(
      tap(e => this.updateRestaurant(e)),
      takeUntil(this.onDestroy)
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
