import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RestaurantDetailsGet } from '@common/api-client/models';

@Component({
  selector: 'app-colors-customization',
  templateUrl: './colors-customization.component.html',
  styleUrls: ['../customization-component.scss']
})
export class ColorsCustomizationComponent {
  public restaurantCopy: RestaurantDetailsGet | undefined;
  public activeColor: string | undefined;
  
  @Input() set restaurant(value: RestaurantDetailsGet) {
    this.restaurantCopy = JSON.parse(JSON.stringify(value));
    this.activeColor = '#' + value.themeMainColor;
  }

  @Output('restaurantUpdate')
  updateRestaurant = new EventEmitter<RestaurantDetailsGet>();

  public publish() {
    if (this.restaurantCopy && this.activeColor) {
      this.restaurantCopy.themeMainColor = this.activeColor.replace('#', '').toUpperCase();
      this.updateRestaurant.emit(this.restaurantCopy);
    } 
  }
}
