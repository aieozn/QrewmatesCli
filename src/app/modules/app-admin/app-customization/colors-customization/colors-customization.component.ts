import { Component, OnDestroy } from '@angular/core';
import { AdminCustomizationService } from '../admin-customization.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-colors-customization',
  templateUrl: './colors-customization.component.html',
  styleUrls: ['../customization-component.scss']
})
export class ColorsCustomizationComponent implements OnDestroy {

  private readonly onDestroy = new Subject<void>();
  
  activeColor: string | undefined;

  constructor(
    private customizationService: AdminCustomizationService
  ) {
    customizationService.getRestaurant().pipe(
      tap(e => this.activeColor = e ? '#' + e.themeMainColor : undefined),
      takeUntil(this.onDestroy)
    ).subscribe()
  }

  publish() {
    const activeRestaurant = this.customizationService.getRestaurantValue();

    activeRestaurant.themeMainColor = this.activeColor!.replace('#', '').toUpperCase();
    this.customizationService.updateRestaurant(activeRestaurant);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
