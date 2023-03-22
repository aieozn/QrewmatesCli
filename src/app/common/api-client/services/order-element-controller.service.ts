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

import { OrderElementData } from '../models/order-element-data';
import { OrderElementGet } from '../models/order-element-get';
import { StatusResponse } from '../models/status-response';

@Injectable({
  providedIn: 'root',
})
export class OrderElementControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getElement
   */
  static readonly GetElementPath = '/api/staff/v1/restaurant/{restaurantRef}/order-instances/{orderInstanceRef}/order-elements/{orderElementRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getElement()` instead.
   *
   * This method doesn't expect any request body.
   */
  getElement$Response(params: {
    restaurantRef: string;
    orderInstanceRef: string;
    orderElementRef: string;
  }): Observable<StrictHttpResponse<OrderElementGet>> {

    const rb = new RequestBuilder(this.rootUrl, OrderElementControllerService.GetElementPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('orderInstanceRef', params.orderInstanceRef, {});
      rb.path('orderElementRef', params.orderElementRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OrderElementGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getElement$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getElement(params: {
    restaurantRef: string;
    orderInstanceRef: string;
    orderElementRef: string;
  }): Observable<OrderElementGet> {

    return this.getElement$Response(params).pipe(
      map((r: StrictHttpResponse<OrderElementGet>) => r.body as OrderElementGet)
    );
  }

  /**
   * Path part for operation putElement
   */
  static readonly PutElementPath = '/api/staff/v1/restaurant/{restaurantRef}/order-instances/{orderInstanceRef}/order-elements/{orderElementRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putElement()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putElement$Response(params: {
    restaurantRef: string;
    orderInstanceRef: string;
    orderElementRef: string;
    body: OrderElementData
  }): Observable<StrictHttpResponse<OrderElementGet>> {

    const rb = new RequestBuilder(this.rootUrl, OrderElementControllerService.PutElementPath, 'put');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('orderInstanceRef', params.orderInstanceRef, {});
      rb.path('orderElementRef', params.orderElementRef, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OrderElementGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putElement$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putElement(params: {
    restaurantRef: string;
    orderInstanceRef: string;
    orderElementRef: string;
    body: OrderElementData
  }): Observable<OrderElementGet> {

    return this.putElement$Response(params).pipe(
      map((r: StrictHttpResponse<OrderElementGet>) => r.body as OrderElementGet)
    );
  }

  /**
   * Path part for operation deleteElement
   */
  static readonly DeleteElementPath = '/api/staff/v1/restaurant/{restaurantRef}/order-instances/{orderInstanceRef}/order-elements/{orderElementRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteElement()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteElement$Response(params: {
    restaurantRef: string;
    orderInstanceRef: string;
    orderElementRef: string;
  }): Observable<StrictHttpResponse<StatusResponse>> {

    const rb = new RequestBuilder(this.rootUrl, OrderElementControllerService.DeleteElementPath, 'delete');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('orderInstanceRef', params.orderInstanceRef, {});
      rb.path('orderElementRef', params.orderElementRef, {});
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
   * To access the full response (for headers, for example), `deleteElement$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteElement(params: {
    restaurantRef: string;
    orderInstanceRef: string;
    orderElementRef: string;
  }): Observable<StatusResponse> {

    return this.deleteElement$Response(params).pipe(
      map((r: StrictHttpResponse<StatusResponse>) => r.body as StatusResponse)
    );
  }

  /**
   * Path part for operation postElement
   */
  static readonly PostElementPath = '/api/staff/v1/restaurant/{restaurantRef}/order-instances/{orderInstanceRef}/order-elements';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postElement()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postElement$Response(params: {
    restaurantRef: string;
    orderInstanceRef: string;
    body: OrderElementData
  }): Observable<StrictHttpResponse<OrderElementGet>> {

    const rb = new RequestBuilder(this.rootUrl, OrderElementControllerService.PostElementPath, 'post');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('orderInstanceRef', params.orderInstanceRef, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OrderElementGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postElement$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postElement(params: {
    restaurantRef: string;
    orderInstanceRef: string;
    body: OrderElementData
  }): Observable<OrderElementGet> {

    return this.postElement$Response(params).pipe(
      map((r: StrictHttpResponse<OrderElementGet>) => r.body as OrderElementGet)
    );
  }

}
