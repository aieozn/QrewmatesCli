/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { RestaurantControllerService } from './services/restaurant-controller.service';
import { RestaurantTableControllerService } from './services/restaurant-table-controller.service';
import { OrderInstanceControllerService } from './services/order-instance-controller.service';
import { OrderStatusControllerService } from './services/order-status-controller.service';
import { OrderElementControllerService } from './services/order-element-controller.service';
import { MenuItemControllerService } from './services/menu-item-controller.service';
import { MenuItemToppingControllerService } from './services/menu-item-topping-controller.service';
import { MenuItemToppingCollectionControllerService } from './services/menu-item-topping-collection-controller.service';
import { MenuItemSelectControllerService } from './services/menu-item-select-controller.service';
import { MenuItemSelectCollectionControllerService } from './services/menu-item-select-collection-controller.service';
import { MenuItemGroupControllerService } from './services/menu-item-group-controller.service';
import { MenuCategoryControllerService } from './services/menu-category-controller.service';
import { AllergenControllerService } from './services/allergen-controller.service';
import { MultimediaControllerService } from './services/multimedia-controller.service';
import { LoginControllerService } from './services/login-controller.service';
import { StatisticsControllerService } from './services/statistics-controller.service';
import { QrCodeConfigControllerService } from './services/qr-code-config-controller.service';
import { RestaurantStylesControllerService } from './services/restaurant-styles-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    RestaurantControllerService,
    RestaurantTableControllerService,
    OrderInstanceControllerService,
    OrderStatusControllerService,
    OrderElementControllerService,
    MenuItemControllerService,
    MenuItemToppingControllerService,
    MenuItemToppingCollectionControllerService,
    MenuItemSelectControllerService,
    MenuItemSelectCollectionControllerService,
    MenuItemGroupControllerService,
    MenuCategoryControllerService,
    AllergenControllerService,
    MultimediaControllerService,
    LoginControllerService,
    StatisticsControllerService,
    QrCodeConfigControllerService,
    RestaurantStylesControllerService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
