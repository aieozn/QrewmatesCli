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

import { RestaurantData } from '../models/restaurant-data';
import { RestaurantDetailsGet } from '../models/restaurant-details-get';
import { RestaurantGet } from '../models/restaurant-get';
import { StatusResponse } from '../models/status-response';

@Injectable({
  providedIn: 'root',
})
export class RestaurantControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation putRestaurant
   */
  static readonly PutRestaurantPath = '/api/staff/v1/restaurant/{restaurantRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putRestaurant()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putRestaurant$Response(params: {
    restaurantRef: string;
    body: RestaurantData
  }): Observable<StrictHttpResponse<RestaurantDetailsGet>> {

    const rb = new RequestBuilder(this.rootUrl, RestaurantControllerService.PutRestaurantPath, 'put');
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
        return r as StrictHttpResponse<RestaurantDetailsGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putRestaurant$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putRestaurant(params: {
    restaurantRef: string;
    body: RestaurantData
  }): Observable<RestaurantDetailsGet> {

    return this.putRestaurant$Response(params).pipe(
      map((r: StrictHttpResponse<RestaurantDetailsGet>) => r.body as RestaurantDetailsGet)
    );
  }

  /**
   * Path part for operation postRestaurant
   */
  static readonly PostRestaurantPath = '/api/staff/v1/restaurant/{restaurantRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postRestaurant()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postRestaurant$Response(params: {
    body: RestaurantData
  }): Observable<StrictHttpResponse<RestaurantDetailsGet>> {

    const rb = new RequestBuilder(this.rootUrl, RestaurantControllerService.PostRestaurantPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestaurantDetailsGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postRestaurant$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postRestaurant(params: {
    body: RestaurantData
  }): Observable<RestaurantDetailsGet> {

    return this.postRestaurant$Response(params).pipe(
      map((r: StrictHttpResponse<RestaurantDetailsGet>) => r.body as RestaurantDetailsGet)
    );
  }

  /**
   * Path part for operation deleteRestaurant
   */
  static readonly DeleteRestaurantPath = '/api/staff/v1/restaurant/{restaurantRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteRestaurant()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRestaurant$Response(params: {
    restaurantRef: string;
  }): Observable<StrictHttpResponse<StatusResponse>> {

    const rb = new RequestBuilder(this.rootUrl, RestaurantControllerService.DeleteRestaurantPath, 'delete');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
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
   * To access the full response (for headers, for example), `deleteRestaurant$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRestaurant(params: {
    restaurantRef: string;
  }): Observable<StatusResponse> {

    return this.deleteRestaurant$Response(params).pipe(
      map((r: StrictHttpResponse<StatusResponse>) => r.body as StatusResponse)
    );
  }

  /**
   * Path part for operation getRestaurantDetails
   */
  static readonly GetRestaurantDetailsPath = '/api/staff/v1/restaurant/{restaurantRef}/details';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRestaurantDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRestaurantDetails$Response(params: {
    restaurantRef: string;
  }): Observable<StrictHttpResponse<RestaurantDetailsGet>> {

    const rb = new RequestBuilder(this.rootUrl, RestaurantControllerService.GetRestaurantDetailsPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestaurantDetailsGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getRestaurantDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRestaurantDetails(params: {
    restaurantRef: string;
  }): Observable<RestaurantDetailsGet> {

    return this.getRestaurantDetails$Response(params).pipe(
      map((r: StrictHttpResponse<RestaurantDetailsGet>) => r.body as RestaurantDetailsGet)
    );
  }

  /**
   * Path part for operation getRestaurant
   */
  static readonly GetRestaurantPath = '/api/public/v1/restaurant/{restaurantRef}/basic';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRestaurant()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRestaurant$Response(params: {
    restaurantRef: string;
  }): Observable<StrictHttpResponse<RestaurantGet>> {

    const rb = new RequestBuilder(this.rootUrl, RestaurantControllerService.GetRestaurantPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestaurantGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getRestaurant$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRestaurant(params: {
    restaurantRef: string;
  }): Observable<RestaurantGet> {

    return this.getRestaurant$Response(params).pipe(
      map((r: StrictHttpResponse<RestaurantGet>) => r.body as RestaurantGet)
    );
  }

}
