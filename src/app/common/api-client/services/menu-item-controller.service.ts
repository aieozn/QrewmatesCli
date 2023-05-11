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
import { MenuItemData } from '../models/menu-item-data';
import { MenuItemDetailedGet } from '../models/menu-item-detailed-get';
import { StatusResponse } from '../models/status-response';

@Injectable({
  providedIn: 'root',
})
export class MenuItemControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation putItem
   */
  static readonly PutItemPath = '/api/staff/v1/restaurant/{restaurantRef}/menu-items/{menuItemRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putItem()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putItem$Response(params: {
    restaurantRef: string;
    menuItemRef: string;
    body: MenuItemData
  }): Observable<StrictHttpResponse<MenuItemDetailedGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemControllerService.PutItemPath, 'put');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('menuItemRef', params.menuItemRef, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MenuItemDetailedGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putItem$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putItem(params: {
    restaurantRef: string;
    menuItemRef: string;
    body: MenuItemData
  }): Observable<MenuItemDetailedGet> {

    return this.putItem$Response(params).pipe(
      map((r: StrictHttpResponse<MenuItemDetailedGet>) => r.body as MenuItemDetailedGet)
    );
  }

  /**
   * Path part for operation deleteItem
   */
  static readonly DeleteItemPath = '/api/staff/v1/restaurant/{restaurantRef}/menu-items/{menuItemRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteItem()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteItem$Response(params: {
    restaurantRef: string;
    menuItemRef: string;
  }): Observable<StrictHttpResponse<StatusResponse>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemControllerService.DeleteItemPath, 'delete');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('menuItemRef', params.menuItemRef, {});
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
   * To access the full response (for headers, for example), `deleteItem$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteItem(params: {
    restaurantRef: string;
    menuItemRef: string;
  }): Observable<StatusResponse> {

    return this.deleteItem$Response(params).pipe(
      map((r: StrictHttpResponse<StatusResponse>) => r.body as StatusResponse)
    );
  }

  /**
   * Path part for operation postItem
   */
  static readonly PostItemPath = '/api/staff/v1/restaurant/{restaurantRef}/menu-items';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postItem()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postItem$Response(params: {
    restaurantRef: string;
    body: MenuItemData
  }): Observable<StrictHttpResponse<MenuItemDetailedGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemControllerService.PostItemPath, 'post');
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
        return r as StrictHttpResponse<MenuItemDetailedGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postItem$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postItem(params: {
    restaurantRef: string;
    body: MenuItemData
  }): Observable<MenuItemDetailedGet> {

    return this.postItem$Response(params).pipe(
      map((r: StrictHttpResponse<MenuItemDetailedGet>) => r.body as MenuItemDetailedGet)
    );
  }

  /**
   * Path part for operation getItemDetails
   */
  static readonly GetItemDetailsPath = '/api/public/v1/restaurant/{restaurantRef}/menu-items/{menuItemRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getItemDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemDetails$Response(params: {
    restaurantRef: string;
    menuItemRef: string;
  }): Observable<StrictHttpResponse<MenuItemDetailedGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemControllerService.GetItemDetailsPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('menuItemRef', params.menuItemRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MenuItemDetailedGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getItemDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemDetails(params: {
    restaurantRef: string;
    menuItemRef: string;
  }): Observable<MenuItemDetailedGet> {

    return this.getItemDetails$Response(params).pipe(
      map((r: StrictHttpResponse<MenuItemDetailedGet>) => r.body as MenuItemDetailedGet)
    );
  }

  /**
   * Path part for operation getItemAllergens
   */
  static readonly GetItemAllergensPath = '/api/public/v1/restaurant/{restaurantRef}/menu-items/{menuItemRef}/allergens';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getItemAllergens()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemAllergens$Response(params: {
    restaurantRef: string;
    menuItemRef: string;
  }): Observable<StrictHttpResponse<Array<AllergenGet>>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemControllerService.GetItemAllergensPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('menuItemRef', params.menuItemRef, {});
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
   * To access the full response (for headers, for example), `getItemAllergens$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemAllergens(params: {
    restaurantRef: string;
    menuItemRef: string;
  }): Observable<Array<AllergenGet>> {

    return this.getItemAllergens$Response(params).pipe(
      map((r: StrictHttpResponse<Array<AllergenGet>>) => r.body as Array<AllergenGet>)
    );
  }

}
