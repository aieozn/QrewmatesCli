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

import { RestaurantTableData } from '../models/restaurant-table-data';
import { RestaurantTableGet } from '../models/restaurant-table-get';
import { StatusResponse } from '../models/status-response';

@Injectable({
  providedIn: 'root',
})
export class RestaurantTableControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation putTable
   */
  static readonly PutTablePath = '/api/staff/v1/restaurant/{restaurantRef}/tables/{tableRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putTable()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putTable$Response(params: {
    restaurantRef: string;
    tableRef: string;
    body: RestaurantTableData
  }): Observable<StrictHttpResponse<RestaurantTableGet>> {

    const rb = new RequestBuilder(this.rootUrl, RestaurantTableControllerService.PutTablePath, 'put');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('tableRef', params.tableRef, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestaurantTableGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putTable$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putTable(params: {
    restaurantRef: string;
    tableRef: string;
    body: RestaurantTableData
  }): Observable<RestaurantTableGet> {

    return this.putTable$Response(params).pipe(
      map((r: StrictHttpResponse<RestaurantTableGet>) => r.body as RestaurantTableGet)
    );
  }

  /**
   * Path part for operation deleteTable
   */
  static readonly DeleteTablePath = '/api/staff/v1/restaurant/{restaurantRef}/tables/{tableRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTable()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTable$Response(params: {
    restaurantRef: string;
    tableRef: string;
  }): Observable<StrictHttpResponse<StatusResponse>> {

    const rb = new RequestBuilder(this.rootUrl, RestaurantTableControllerService.DeleteTablePath, 'delete');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('tableRef', params.tableRef, {});
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
   * To access the full response (for headers, for example), `deleteTable$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTable(params: {
    restaurantRef: string;
    tableRef: string;
  }): Observable<StatusResponse> {

    return this.deleteTable$Response(params).pipe(
      map((r: StrictHttpResponse<StatusResponse>) => r.body as StatusResponse)
    );
  }

  /**
   * Path part for operation postTable
   */
  static readonly PostTablePath = '/api/staff/v1/restaurant/{restaurantRef}/tables';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postTable()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postTable$Response(params: {
    restaurantRef: string;
    body: RestaurantTableData
  }): Observable<StrictHttpResponse<RestaurantTableGet>> {

    const rb = new RequestBuilder(this.rootUrl, RestaurantTableControllerService.PostTablePath, 'post');
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
        return r as StrictHttpResponse<RestaurantTableGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postTable$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postTable(params: {
    restaurantRef: string;
    body: RestaurantTableData
  }): Observable<RestaurantTableGet> {

    return this.postTable$Response(params).pipe(
      map((r: StrictHttpResponse<RestaurantTableGet>) => r.body as RestaurantTableGet)
    );
  }

  /**
   * Path part for operation getTable
   */
  static readonly GetTablePath = '/api/public/v1/restaurant/{restaurantRef}/tables/{tableRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTable()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTable$Response(params: {
    restaurantRef: string;
    tableRef: string;
  }): Observable<StrictHttpResponse<RestaurantTableGet>> {

    const rb = new RequestBuilder(this.rootUrl, RestaurantTableControllerService.GetTablePath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('tableRef', params.tableRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestaurantTableGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTable$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTable(params: {
    restaurantRef: string;
    tableRef: string;
  }): Observable<RestaurantTableGet> {

    return this.getTable$Response(params).pipe(
      map((r: StrictHttpResponse<RestaurantTableGet>) => r.body as RestaurantTableGet)
    );
  }

}
