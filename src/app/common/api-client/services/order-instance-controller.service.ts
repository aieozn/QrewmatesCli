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

import { OrderData } from '../models/order-data';
import { OrderDetailsGet } from '../models/order-details-get';
import { StatusResponse } from '../models/status-response';

@Injectable({
  providedIn: 'root',
})
export class OrderInstanceControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation editOrder
   */
  static readonly EditOrderPath = '/api/staff/v1/restaurant/{restaurantRef}/order-instances/{orderInstanceRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editOrder()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editOrder$Response(params: {
    restaurantRef: string;
    orderInstanceRef: string;
    body: OrderData
  }): Observable<StrictHttpResponse<OrderDetailsGet>> {

    const rb = new RequestBuilder(this.rootUrl, OrderInstanceControllerService.EditOrderPath, 'put');
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
        return r as StrictHttpResponse<OrderDetailsGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `editOrder$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editOrder(params: {
    restaurantRef: string;
    orderInstanceRef: string;
    body: OrderData
  }): Observable<OrderDetailsGet> {

    return this.editOrder$Response(params).pipe(
      map((r: StrictHttpResponse<OrderDetailsGet>) => r.body as OrderDetailsGet)
    );
  }

  /**
   * Path part for operation deleteOrder
   */
  static readonly DeleteOrderPath = '/api/staff/v1/restaurant/{restaurantRef}/order-instances/{orderInstanceRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteOrder()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOrder$Response(params: {
    restaurantRef: string;
    orderInstanceRef: string;
  }): Observable<StrictHttpResponse<StatusResponse>> {

    const rb = new RequestBuilder(this.rootUrl, OrderInstanceControllerService.DeleteOrderPath, 'delete');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('orderInstanceRef', params.orderInstanceRef, {});
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
   * To access the full response (for headers, for example), `deleteOrder$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOrder(params: {
    restaurantRef: string;
    orderInstanceRef: string;
  }): Observable<StatusResponse> {

    return this.deleteOrder$Response(params).pipe(
      map((r: StrictHttpResponse<StatusResponse>) => r.body as StatusResponse)
    );
  }

  /**
   * Path part for operation order
   */
  static readonly OrderPath = '/api/public/v1/restaurant/{restaurantRef}/order-instances';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `order()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  order$Response(params: {
    restaurantRef: string;
    body: OrderData
  }): Observable<StrictHttpResponse<OrderDetailsGet>> {

    const rb = new RequestBuilder(this.rootUrl, OrderInstanceControllerService.OrderPath, 'post');
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
        return r as StrictHttpResponse<OrderDetailsGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `order$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  order(params: {
    restaurantRef: string;
    body: OrderData
  }): Observable<OrderDetailsGet> {

    return this.order$Response(params).pipe(
      map((r: StrictHttpResponse<OrderDetailsGet>) => r.body as OrderDetailsGet)
    );
  }

  /**
   * Path part for operation getOrder
   */
  static readonly GetOrderPath = '/api/public/v1/restaurant/{restaurantRef}/order-instances/{orderInstanceRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrder()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrder$Response(params: {
    restaurantRef: string;
    orderInstanceRef: string;
  }): Observable<StrictHttpResponse<OrderDetailsGet>> {

    const rb = new RequestBuilder(this.rootUrl, OrderInstanceControllerService.GetOrderPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('orderInstanceRef', params.orderInstanceRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OrderDetailsGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOrder$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrder(params: {
    restaurantRef: string;
    orderInstanceRef: string;
  }): Observable<OrderDetailsGet> {

    return this.getOrder$Response(params).pipe(
      map((r: StrictHttpResponse<OrderDetailsGet>) => r.body as OrderDetailsGet)
    );
  }

}
