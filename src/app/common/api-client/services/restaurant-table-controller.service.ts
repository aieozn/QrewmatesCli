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
   * Path part for operation getQrSvg
   */
  static readonly GetQrSvgPath = '/api/staff/v1/restaurant/{restaurantRef}/tables/{tableRef}/raw';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getQrSvg()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQrSvg$Response(params: {
    restaurantRef: string;
    tableRef: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, RestaurantTableControllerService.GetQrSvgPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('tableRef', params.tableRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getQrSvg$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQrSvg(params: {
    restaurantRef: string;
    tableRef: string;
  }): Observable<Blob> {

    return this.getQrSvg$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation getQrPdf
   */
  static readonly GetQrPdfPath = '/api/staff/v1/restaurant/{restaurantRef}/tables/{tableRef}/pdf';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getQrPdf()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQrPdf$Response(params: {
    restaurantRef: string;
    tableRef: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, RestaurantTableControllerService.GetQrPdfPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('tableRef', params.tableRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getQrPdf$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQrPdf(params: {
    restaurantRef: string;
    tableRef: string;
  }): Observable<Blob> {

    return this.getQrPdf$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation getQrImage
   */
  static readonly GetQrImagePath = '/api/staff/v1/restaurant/{restaurantRef}/tables/{tableRef}/image';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getQrImage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQrImage$Response(params: {
    restaurantRef: string;
    tableRef: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, RestaurantTableControllerService.GetQrImagePath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('tableRef', params.tableRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getQrImage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQrImage(params: {
    restaurantRef: string;
    tableRef: string;
  }): Observable<Blob> {

    return this.getQrImage$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation getQrsPdf
   */
  static readonly GetQrsPdfPath = '/api/staff/v1/restaurant/{restaurantRef}/qr-codes/pdf';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getQrsPdf()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQrsPdf$Response(params: {
    restaurantRef: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, RestaurantTableControllerService.GetQrsPdfPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getQrsPdf$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQrsPdf(params: {
    restaurantRef: string;
  }): Observable<Blob> {

    return this.getQrsPdf$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation getQrsImages
   */
  static readonly GetQrsImagesPath = '/api/staff/v1/restaurant/{restaurantRef}/qr-codes/image';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getQrsImages()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQrsImages$Response(params: {
    restaurantRef: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, RestaurantTableControllerService.GetQrsImagesPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getQrsImages$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQrsImages(params: {
    restaurantRef: string;
  }): Observable<Blob> {

    return this.getQrsImages$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation getTables
   */
  static readonly GetTablesPath = '/api/public/v1/restaurant/{restaurantRef}/tables';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTables()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTables$Response(params: {
    restaurantRef: string;
  }): Observable<StrictHttpResponse<Array<RestaurantTableGet>>> {

    const rb = new RequestBuilder(this.rootUrl, RestaurantTableControllerService.GetTablesPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<RestaurantTableGet>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTables$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTables(params: {
    restaurantRef: string;
  }): Observable<Array<RestaurantTableGet>> {

    return this.getTables$Response(params).pipe(
      map((r: StrictHttpResponse<Array<RestaurantTableGet>>) => r.body as Array<RestaurantTableGet>)
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
