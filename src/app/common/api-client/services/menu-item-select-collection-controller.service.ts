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

import { MenuItemSelectCollectionData } from '../models/menu-item-select-collection-data';
import { MenuItemSelectCollectionGet } from '../models/menu-item-select-collection-get';
import { StatusResponse } from '../models/status-response';

@Injectable({
  providedIn: 'root',
})
export class MenuItemSelectCollectionControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation putSelectCollection
   */
  static readonly PutSelectCollectionPath = '/api/staff/v1/restaurant/{restaurantRef}/menu-item-select-collections/{menuItemSelectCollectionRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putSelectCollection()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putSelectCollection$Response(params: {
    restaurantRef: string;
    menuItemSelectCollectionRef: string;
    body: MenuItemSelectCollectionData
  }): Observable<StrictHttpResponse<MenuItemSelectCollectionGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemSelectCollectionControllerService.PutSelectCollectionPath, 'put');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('menuItemSelectCollectionRef', params.menuItemSelectCollectionRef, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MenuItemSelectCollectionGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putSelectCollection$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putSelectCollection(params: {
    restaurantRef: string;
    menuItemSelectCollectionRef: string;
    body: MenuItemSelectCollectionData
  }): Observable<MenuItemSelectCollectionGet> {

    return this.putSelectCollection$Response(params).pipe(
      map((r: StrictHttpResponse<MenuItemSelectCollectionGet>) => r.body as MenuItemSelectCollectionGet)
    );
  }

  /**
   * Path part for operation deleteSelectCollection
   */
  static readonly DeleteSelectCollectionPath = '/api/staff/v1/restaurant/{restaurantRef}/menu-item-select-collections/{menuItemSelectCollectionRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSelectCollection()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSelectCollection$Response(params: {
    restaurantRef: string;
    menuItemSelectCollectionRef: string;
  }): Observable<StrictHttpResponse<StatusResponse>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemSelectCollectionControllerService.DeleteSelectCollectionPath, 'delete');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('menuItemSelectCollectionRef', params.menuItemSelectCollectionRef, {});
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
   * To access the full response (for headers, for example), `deleteSelectCollection$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSelectCollection(params: {
    restaurantRef: string;
    menuItemSelectCollectionRef: string;
  }): Observable<StatusResponse> {

    return this.deleteSelectCollection$Response(params).pipe(
      map((r: StrictHttpResponse<StatusResponse>) => r.body as StatusResponse)
    );
  }

  /**
   * Path part for operation getSelectCollections
   */
  static readonly GetSelectCollectionsPath = '/api/staff/v1/restaurant/{restaurantRef}/menu-item-select-collections';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSelectCollections()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSelectCollections$Response(params: {
    restaurantRef: string;
  }): Observable<StrictHttpResponse<Array<MenuItemSelectCollectionGet>>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemSelectCollectionControllerService.GetSelectCollectionsPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<MenuItemSelectCollectionGet>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSelectCollections$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSelectCollections(params: {
    restaurantRef: string;
  }): Observable<Array<MenuItemSelectCollectionGet>> {

    return this.getSelectCollections$Response(params).pipe(
      map((r: StrictHttpResponse<Array<MenuItemSelectCollectionGet>>) => r.body as Array<MenuItemSelectCollectionGet>)
    );
  }

  /**
   * Path part for operation postSelectCollection
   */
  static readonly PostSelectCollectionPath = '/api/staff/v1/restaurant/{restaurantRef}/menu-item-select-collections';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postSelectCollection()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSelectCollection$Response(params: {
    restaurantRef: string;
    body: MenuItemSelectCollectionData
  }): Observable<StrictHttpResponse<MenuItemSelectCollectionGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemSelectCollectionControllerService.PostSelectCollectionPath, 'post');
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
        return r as StrictHttpResponse<MenuItemSelectCollectionGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postSelectCollection$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postSelectCollection(params: {
    restaurantRef: string;
    body: MenuItemSelectCollectionData
  }): Observable<MenuItemSelectCollectionGet> {

    return this.postSelectCollection$Response(params).pipe(
      map((r: StrictHttpResponse<MenuItemSelectCollectionGet>) => r.body as MenuItemSelectCollectionGet)
    );
  }

  /**
   * Path part for operation getSelectCollection
   */
  static readonly GetSelectCollectionPath = '/api/public/v1/restaurant/{restaurantRef}/menu-item-select-collections/{menuItemSelectCollectionRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSelectCollection()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSelectCollection$Response(params: {
    restaurantRef: string;
    menuItemSelectCollectionRef: string;
  }): Observable<StrictHttpResponse<MenuItemSelectCollectionGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemSelectCollectionControllerService.GetSelectCollectionPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('menuItemSelectCollectionRef', params.menuItemSelectCollectionRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MenuItemSelectCollectionGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSelectCollection$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSelectCollection(params: {
    restaurantRef: string;
    menuItemSelectCollectionRef: string;
  }): Observable<MenuItemSelectCollectionGet> {

    return this.getSelectCollection$Response(params).pipe(
      map((r: StrictHttpResponse<MenuItemSelectCollectionGet>) => r.body as MenuItemSelectCollectionGet)
    );
  }

}
