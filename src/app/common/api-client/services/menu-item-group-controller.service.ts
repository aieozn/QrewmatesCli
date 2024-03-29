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

import { MenuItemGroupAggregateData } from '../models/menu-item-group-aggregate-data';
import { MenuItemGroupData } from '../models/menu-item-group-data';
import { MenuItemGroupGet } from '../models/menu-item-group-get';
import { StatusResponse } from '../models/status-response';

@Injectable({
  providedIn: 'root',
})
export class MenuItemGroupControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation putItemGroup
   */
  static readonly PutItemGroupPath = '/api/staff/v1/restaurant/{restaurantRef}/menu-item-groups/{menuItemGroupRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putItemGroup()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putItemGroup$Response(params: {
    restaurantRef: string;
    menuItemGroupRef: string;
    body: MenuItemGroupData
  }): Observable<StrictHttpResponse<MenuItemGroupGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemGroupControllerService.PutItemGroupPath, 'put');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('menuItemGroupRef', params.menuItemGroupRef, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MenuItemGroupGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putItemGroup$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putItemGroup(params: {
    restaurantRef: string;
    menuItemGroupRef: string;
    body: MenuItemGroupData
  }): Observable<MenuItemGroupGet> {

    return this.putItemGroup$Response(params).pipe(
      map((r: StrictHttpResponse<MenuItemGroupGet>) => r.body as MenuItemGroupGet)
    );
  }

  /**
   * Path part for operation deleteMenuItemGroup
   */
  static readonly DeleteMenuItemGroupPath = '/api/staff/v1/restaurant/{restaurantRef}/menu-item-groups/{menuItemGroupRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteMenuItemGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteMenuItemGroup$Response(params: {
    restaurantRef: string;
    menuItemGroupRef: string;
  }): Observable<StrictHttpResponse<StatusResponse>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemGroupControllerService.DeleteMenuItemGroupPath, 'delete');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('menuItemGroupRef', params.menuItemGroupRef, {});
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
   * To access the full response (for headers, for example), `deleteMenuItemGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteMenuItemGroup(params: {
    restaurantRef: string;
    menuItemGroupRef: string;
  }): Observable<StatusResponse> {

    return this.deleteMenuItemGroup$Response(params).pipe(
      map((r: StrictHttpResponse<StatusResponse>) => r.body as StatusResponse)
    );
  }

  /**
   * Path part for operation moveUp3
   */
  static readonly MoveUp3Path = '/api/staff/v1/restaurant/{restaurantRef}/menu-item-groups/{menuItemGroupRef}/element-order/up';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `moveUp3()` instead.
   *
   * This method doesn't expect any request body.
   */
  moveUp3$Response(params: {
    restaurantRef: string;
    menuItemGroupRef: string;
  }): Observable<StrictHttpResponse<MenuItemGroupGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemGroupControllerService.MoveUp3Path, 'put');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('menuItemGroupRef', params.menuItemGroupRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MenuItemGroupGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `moveUp3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  moveUp3(params: {
    restaurantRef: string;
    menuItemGroupRef: string;
  }): Observable<MenuItemGroupGet> {

    return this.moveUp3$Response(params).pipe(
      map((r: StrictHttpResponse<MenuItemGroupGet>) => r.body as MenuItemGroupGet)
    );
  }

  /**
   * Path part for operation moveDown3
   */
  static readonly MoveDown3Path = '/api/staff/v1/restaurant/{restaurantRef}/menu-item-groups/{menuItemGroupRef}/element-order/down';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `moveDown3()` instead.
   *
   * This method doesn't expect any request body.
   */
  moveDown3$Response(params: {
    restaurantRef: string;
    menuItemGroupRef: string;
  }): Observable<StrictHttpResponse<MenuItemGroupGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemGroupControllerService.MoveDown3Path, 'put');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('menuItemGroupRef', params.menuItemGroupRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MenuItemGroupGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `moveDown3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  moveDown3(params: {
    restaurantRef: string;
    menuItemGroupRef: string;
  }): Observable<MenuItemGroupGet> {

    return this.moveDown3$Response(params).pipe(
      map((r: StrictHttpResponse<MenuItemGroupGet>) => r.body as MenuItemGroupGet)
    );
  }

  /**
   * Path part for operation putItemGroupAggregate
   */
  static readonly PutItemGroupAggregatePath = '/api/staff/v1/restaurant/{restaurantRef}/menu-item-group-aggregates/{menuItemGroupRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putItemGroupAggregate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putItemGroupAggregate$Response(params: {
    restaurantRef: string;
    menuItemGroupRef: string;
    body: MenuItemGroupAggregateData
  }): Observable<StrictHttpResponse<MenuItemGroupGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemGroupControllerService.PutItemGroupAggregatePath, 'put');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('menuItemGroupRef', params.menuItemGroupRef, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MenuItemGroupGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putItemGroupAggregate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putItemGroupAggregate(params: {
    restaurantRef: string;
    menuItemGroupRef: string;
    body: MenuItemGroupAggregateData
  }): Observable<MenuItemGroupGet> {

    return this.putItemGroupAggregate$Response(params).pipe(
      map((r: StrictHttpResponse<MenuItemGroupGet>) => r.body as MenuItemGroupGet)
    );
  }

  /**
   * Path part for operation postItemGroup
   */
  static readonly PostItemGroupPath = '/api/staff/v1/restaurant/{restaurantRef}/menu-item-group-aggregates';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postItemGroup()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postItemGroup$Response(params: {
    restaurantRef: string;
    body: MenuItemGroupAggregateData
  }): Observable<StrictHttpResponse<MenuItemGroupGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemGroupControllerService.PostItemGroupPath, 'post');
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
        return r as StrictHttpResponse<MenuItemGroupGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postItemGroup$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postItemGroup(params: {
    restaurantRef: string;
    body: MenuItemGroupAggregateData
  }): Observable<MenuItemGroupGet> {

    return this.postItemGroup$Response(params).pipe(
      map((r: StrictHttpResponse<MenuItemGroupGet>) => r.body as MenuItemGroupGet)
    );
  }

  /**
   * Path part for operation getItemGroupDetails
   */
  static readonly GetItemGroupDetailsPath = '/api/public/v1/restaurant/{restaurantRef}/menu-item-groups/{menuItemGroupRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getItemGroupDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemGroupDetails$Response(params: {
    restaurantRef: string;
    menuItemGroupRef: string;
  }): Observable<StrictHttpResponse<MenuItemGroupGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuItemGroupControllerService.GetItemGroupDetailsPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('menuItemGroupRef', params.menuItemGroupRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MenuItemGroupGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getItemGroupDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getItemGroupDetails(params: {
    restaurantRef: string;
    menuItemGroupRef: string;
  }): Observable<MenuItemGroupGet> {

    return this.getItemGroupDetails$Response(params).pipe(
      map((r: StrictHttpResponse<MenuItemGroupGet>) => r.body as MenuItemGroupGet)
    );
  }

}
