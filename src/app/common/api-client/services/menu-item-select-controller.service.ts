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
import { MenuItemSelectData } from '../models/menu-item-select-data';
import { MenuItemSelectDetailedGet } from '../models/menu-item-select-detailed-get';
import { StatusResponse } from '../models/status-response';

@Injectable({
  providedIn: 'root',
})
export class MenuItemSelectControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation putSelect
   */
  static readonly PutSelectPath = '/api/staff/v1/restaurant/{restaurantRef}/menu-item-selects/{menuItemSelectRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putSelect()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putSelect$Response(params: {
    restaurantRef: string;
    menuItemSelectRef: string;
    body: MenuItemSelectData
  }): Observable<StrictHttpResponse<MenuItemSelectDetailedGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemSelectControllerService.PutSelectPath, 'put');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('menuItemSelectRef', params.menuItemSelectRef, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MenuItemSelectDetailedGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putSelect$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putSelect(params: {
    restaurantRef: string;
    menuItemSelectRef: string;
    body: MenuItemSelectData
  }): Observable<MenuItemSelectDetailedGet> {

    return this.putSelect$Response(params).pipe(
      map((r: StrictHttpResponse<MenuItemSelectDetailedGet>) => r.body as MenuItemSelectDetailedGet)
    );
  }

  /**
   * Path part for operation deleteSelect
   */
  static readonly DeleteSelectPath = '/api/staff/v1/restaurant/{restaurantRef}/menu-item-selects/{menuItemSelectRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSelect()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSelect$Response(params: {
    restaurantRef: string;
    menuItemSelectRef: string;
  }): Observable<StrictHttpResponse<StatusResponse>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemSelectControllerService.DeleteSelectPath, 'delete');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('menuItemSelectRef', params.menuItemSelectRef, {});
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
   * To access the full response (for headers, for example), `deleteSelect$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSelect(params: {
    restaurantRef: string;
    menuItemSelectRef: string;
  }): Observable<StatusResponse> {

    return this.deleteSelect$Response(params).pipe(
      map((r: StrictHttpResponse<StatusResponse>) => r.body as StatusResponse)
    );
  }

  /**
   * Path part for operation postSelect
   */
  static readonly PostSelectPath = '/api/staff/v1/restaurant/{restaurantRef}/menu-item-selects';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSelect()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSelect$Response(params: {
    restaurantRef: string;
    body: MenuItemSelectData
  }): Observable<StrictHttpResponse<MenuItemSelectDetailedGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemSelectControllerService.PostSelectPath, 'post');
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
        return r as StrictHttpResponse<MenuItemSelectDetailedGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postSelect$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSelect(params: {
    restaurantRef: string;
    body: MenuItemSelectData
  }): Observable<MenuItemSelectDetailedGet> {

    return this.postSelect$Response(params).pipe(
      map((r: StrictHttpResponse<MenuItemSelectDetailedGet>) => r.body as MenuItemSelectDetailedGet)
    );
  }

  /**
   * Path part for operation getSelect
   */
  static readonly GetSelectPath = '/api/public/v1/restaurant/{restaurantRef}/menu-item-selects/{menuItemSelectRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSelect()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSelect$Response(params: {
    restaurantRef: string;
    menuItemSelectRef: string;
  }): Observable<StrictHttpResponse<MenuItemSelectDetailedGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemSelectControllerService.GetSelectPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('menuItemSelectRef', params.menuItemSelectRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MenuItemSelectDetailedGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSelect$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSelect(params: {
    restaurantRef: string;
    menuItemSelectRef: string;
  }): Observable<MenuItemSelectDetailedGet> {

    return this.getSelect$Response(params).pipe(
      map((r: StrictHttpResponse<MenuItemSelectDetailedGet>) => r.body as MenuItemSelectDetailedGet)
    );
  }

  /**
   * Path part for operation getSelectAllergens
   */
  static readonly GetSelectAllergensPath = '/api/public/v1/restaurant/{restaurantRef}/menu-item-selects/{menuItemSelectRef}/allergens';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSelectAllergens()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSelectAllergens$Response(params: {
    restaurantRef: string;
    menuItemSelectRef: string;
  }): Observable<StrictHttpResponse<Array<AllergenGet>>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemSelectControllerService.GetSelectAllergensPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('menuItemSelectRef', params.menuItemSelectRef, {});
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
   * To access the full response (for headers, for example), `getSelectAllergens$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSelectAllergens(params: {
    restaurantRef: string;
    menuItemSelectRef: string;
  }): Observable<Array<AllergenGet>> {

    return this.getSelectAllergens$Response(params).pipe(
      map((r: StrictHttpResponse<Array<AllergenGet>>) => r.body as Array<AllergenGet>)
    );
  }

}
