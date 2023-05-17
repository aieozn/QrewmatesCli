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

import { MenuItemToppingCollectionData } from '../models/menu-item-topping-collection-data';
import { MenuItemToppingCollectionGet } from '../models/menu-item-topping-collection-get';
import { StatusResponse } from '../models/status-response';

@Injectable({
  providedIn: 'root',
})
export class MenuItemToppingCollectionControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation putToppingCollection
   */
  static readonly PutToppingCollectionPath = '/api/staff/v1/restaurant/{restaurantRef}/menu-item-topping-collections/{menuItemToppingCollectionRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putToppingCollection()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putToppingCollection$Response(params: {
    restaurantRef: string;
    menuItemToppingCollectionRef: string;
    body: MenuItemToppingCollectionData
  }): Observable<StrictHttpResponse<MenuItemToppingCollectionGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemToppingCollectionControllerService.PutToppingCollectionPath, 'put');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('menuItemToppingCollectionRef', params.menuItemToppingCollectionRef, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MenuItemToppingCollectionGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putToppingCollection$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putToppingCollection(params: {
    restaurantRef: string;
    menuItemToppingCollectionRef: string;
    body: MenuItemToppingCollectionData
  }): Observable<MenuItemToppingCollectionGet> {

    return this.putToppingCollection$Response(params).pipe(
      map((r: StrictHttpResponse<MenuItemToppingCollectionGet>) => r.body as MenuItemToppingCollectionGet)
    );
  }

  /**
   * Path part for operation deleteToppingCollection
   */
  static readonly DeleteToppingCollectionPath = '/api/staff/v1/restaurant/{restaurantRef}/menu-item-topping-collections/{menuItemToppingCollectionRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteToppingCollection()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteToppingCollection$Response(params: {
    restaurantRef: string;
    menuItemToppingCollectionRef: string;
  }): Observable<StrictHttpResponse<StatusResponse>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemToppingCollectionControllerService.DeleteToppingCollectionPath, 'delete');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('menuItemToppingCollectionRef', params.menuItemToppingCollectionRef, {});
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
   * To access the full response (for headers, for example), `deleteToppingCollection$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteToppingCollection(params: {
    restaurantRef: string;
    menuItemToppingCollectionRef: string;
  }): Observable<StatusResponse> {

    return this.deleteToppingCollection$Response(params).pipe(
      map((r: StrictHttpResponse<StatusResponse>) => r.body as StatusResponse)
    );
  }

  /**
   * Path part for operation getToppingCollections
   */
  static readonly GetToppingCollectionsPath = '/api/staff/v1/restaurant/{restaurantRef}/menu-item-topping-collections';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getToppingCollections()` instead.
   *
   * This method doesn't expect any request body.
   */
  getToppingCollections$Response(params: {
    restaurantRef: string;
  }): Observable<StrictHttpResponse<Array<MenuItemToppingCollectionGet>>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemToppingCollectionControllerService.GetToppingCollectionsPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<MenuItemToppingCollectionGet>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getToppingCollections$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getToppingCollections(params: {
    restaurantRef: string;
  }): Observable<Array<MenuItemToppingCollectionGet>> {

    return this.getToppingCollections$Response(params).pipe(
      map((r: StrictHttpResponse<Array<MenuItemToppingCollectionGet>>) => r.body as Array<MenuItemToppingCollectionGet>)
    );
  }

  /**
   * Path part for operation postToppingCollection
   */
  static readonly PostToppingCollectionPath = '/api/staff/v1/restaurant/{restaurantRef}/menu-item-topping-collections';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postToppingCollection()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postToppingCollection$Response(params: {
    restaurantRef: string;
    body: MenuItemToppingCollectionData
  }): Observable<StrictHttpResponse<MenuItemToppingCollectionGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemToppingCollectionControllerService.PostToppingCollectionPath, 'post');
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
        return r as StrictHttpResponse<MenuItemToppingCollectionGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postToppingCollection$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postToppingCollection(params: {
    restaurantRef: string;
    body: MenuItemToppingCollectionData
  }): Observable<MenuItemToppingCollectionGet> {

    return this.postToppingCollection$Response(params).pipe(
      map((r: StrictHttpResponse<MenuItemToppingCollectionGet>) => r.body as MenuItemToppingCollectionGet)
    );
  }

  /**
   * Path part for operation getToppingCollection
   */
  static readonly GetToppingCollectionPath = '/api/public/v1/restaurant/{restaurantRef}/menu-item-topping-collections/{menuItemToppingCollectionRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getToppingCollection()` instead.
   *
   * This method doesn't expect any request body.
   */
  getToppingCollection$Response(params: {
    restaurantRef: string;
    menuItemToppingCollectionRef: string;
  }): Observable<StrictHttpResponse<MenuItemToppingCollectionGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemToppingCollectionControllerService.GetToppingCollectionPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('menuItemToppingCollectionRef', params.menuItemToppingCollectionRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MenuItemToppingCollectionGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getToppingCollection$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getToppingCollection(params: {
    restaurantRef: string;
    menuItemToppingCollectionRef: string;
  }): Observable<MenuItemToppingCollectionGet> {

    return this.getToppingCollection$Response(params).pipe(
      map((r: StrictHttpResponse<MenuItemToppingCollectionGet>) => r.body as MenuItemToppingCollectionGet)
    );
  }

}
