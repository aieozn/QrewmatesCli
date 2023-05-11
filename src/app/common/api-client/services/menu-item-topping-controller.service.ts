/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AllergenGet } from '../models/allergen-get';
import { MenuItemToppingData } from '../models/menu-item-topping-data';
import { MenuItemToppingDetailedGet } from '../models/menu-item-topping-detailed-get';
import { StatusResponse } from '../models/status-response';

@Injectable({
  providedIn: 'root',
})
export class MenuItemToppingControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation putTopping
   */
  static readonly PutToppingPath = '/api/staff/v1/restaurant/{restaurantRef}/menu-item-toppings/{menuItemToppingRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putTopping()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putTopping$Response(params: {
    restaurantRef: string;
    menuItemToppingRef: string;
    body: MenuItemToppingData
  }): Observable<StrictHttpResponse<MenuItemToppingDetailedGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemToppingControllerService.PutToppingPath, 'put');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('menuItemToppingRef', params.menuItemToppingRef, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MenuItemToppingDetailedGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putTopping$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putTopping(params: {
    restaurantRef: string;
    menuItemToppingRef: string;
    body: MenuItemToppingData
  }): Observable<MenuItemToppingDetailedGet> {

    return this.putTopping$Response(params).pipe(
      map((r: StrictHttpResponse<MenuItemToppingDetailedGet>) => r.body as MenuItemToppingDetailedGet)
    );
  }

  /**
   * Path part for operation deleteTopping
   */
  static readonly DeleteToppingPath = '/api/staff/v1/restaurant/{restaurantRef}/menu-item-toppings/{menuItemToppingRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTopping()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTopping$Response(params: {
    restaurantRef: string;
    menuItemToppingRef: string;
  }): Observable<StrictHttpResponse<StatusResponse>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemToppingControllerService.DeleteToppingPath, 'delete');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('menuItemToppingRef', params.menuItemToppingRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<StatusResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteTopping$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTopping(params: {
    restaurantRef: string;
    menuItemToppingRef: string;
  }): Observable<StatusResponse> {

    return this.deleteTopping$Response(params).pipe(
      map((r: StrictHttpResponse<StatusResponse>) => r.body as StatusResponse)
    );
  }

  /**
   * Path part for operation postTopping
   */
  static readonly PostToppingPath = '/api/staff/v1/restaurant/{restaurantRef}/menu-item-toppings';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postTopping()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postTopping$Response(params: {
    restaurantRef: string;
    body: MenuItemToppingData
  }): Observable<StrictHttpResponse<MenuItemToppingDetailedGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemToppingControllerService.PostToppingPath, 'post');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MenuItemToppingDetailedGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postTopping$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postTopping(params: {
    restaurantRef: string;
    body: MenuItemToppingData
  }): Observable<MenuItemToppingDetailedGet> {

    return this.postTopping$Response(params).pipe(
      map((r: StrictHttpResponse<MenuItemToppingDetailedGet>) => r.body as MenuItemToppingDetailedGet)
    );
  }

  /**
   * Path part for operation getTopping
   */
  static readonly GetToppingPath = '/api/public/v1/restaurant/{restaurantRef}/menu-item-toppings/{menuItemToppingRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTopping()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTopping$Response(params: {
    restaurantRef: string;
    menuItemToppingRef: string;
  }): Observable<StrictHttpResponse<MenuItemToppingDetailedGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemToppingControllerService.GetToppingPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('menuItemToppingRef', params.menuItemToppingRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MenuItemToppingDetailedGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTopping$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTopping(params: {
    restaurantRef: string;
    menuItemToppingRef: string;
  }): Observable<MenuItemToppingDetailedGet> {

    return this.getTopping$Response(params).pipe(
      map((r: StrictHttpResponse<MenuItemToppingDetailedGet>) => r.body as MenuItemToppingDetailedGet)
    );
  }

  /**
   * Path part for operation getToppingAllergens
   */
  static readonly GetToppingAllergensPath = '/api/public/v1/restaurant/{restaurantRef}/menu-item-toppings/{menuItemToppingRef}/allergens';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getToppingAllergens()` instead.
   *
   * This method doesn't expect any request body.
   */
  getToppingAllergens$Response(params: {
    restaurantRef: string;
    menuItemToppingRef: string;
  }): Observable<StrictHttpResponse<Array<AllergenGet>>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemToppingControllerService.GetToppingAllergensPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('menuItemToppingRef', params.menuItemToppingRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<AllergenGet>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getToppingAllergens$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getToppingAllergens(params: {
    restaurantRef: string;
    menuItemToppingRef: string;
  }): Observable<Array<AllergenGet>> {

    return this.getToppingAllergens$Response(params).pipe(
      map((r: StrictHttpResponse<Array<AllergenGet>>) => r.body as Array<AllergenGet>)
    );
  }

}
