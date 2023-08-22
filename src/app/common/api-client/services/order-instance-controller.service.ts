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

import { DoOrderData } from '../models/do-order-data';
import { ListOrderParams } from '../models/list-order-params';
import { OrderDetailsGet } from '../models/order-details-get';
import { PageGetOrdersListElement } from '../models/page-get-orders-list-element';
import { StatusResponse } from '../models/status-response';
import { UpdateOrderData } from '../models/update-order-data';

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
    body: UpdateOrderData
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
    body: UpdateOrderData
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
    body: DoOrderData
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
    body: DoOrderData
  }): Observable<OrderDetailsGet> {

    return this.order$Response(params).pipe(
      map((r: StrictHttpResponse<OrderDetailsGet>) => r.body as OrderDetailsGet)
    );
  }

  /**
   * Path part for operation getOrders
   */
  static readonly GetOrdersPath = '/api/staff/v1/restaurant/{restaurantRef}/order-instances';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrders()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrders$Response(params: {
    restaurantRef: string;
    listOrderParams: ListOrderParams;
  }): Observable<StrictHttpResponse<PageGetOrdersListElement>> {

    const rb = new RequestBuilder(this.rootUrl, OrderInstanceControllerService.GetOrdersPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.query('listOrderParams', params.listOrderParams, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PageGetOrdersListElement>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOrders$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrders(params: {
    restaurantRef: string;
    listOrderParams: ListOrderParams;
  }): Observable<PageGetOrdersListElement> {

    return this.getOrders$Response(params).pipe(
      map((r: StrictHttpResponse<PageGetOrdersListElement>) => r.body as PageGetOrdersListElement)
    );
  }

  /**
   * Path part for operation flush
   */
  static readonly FlushPath = '/api/staff/v1/restaurant/{restaurantRef}/order-instances';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `flush()` instead.
   *
   * This method doesn't expect any request body.
   */
  flush$Response(params: {
    restaurantRef: string;
  }): Observable<StrictHttpResponse<'100 CONTINUE' | '101 SWITCHING_PROTOCOLS' | '102 PROCESSING' | '103 CHECKPOINT' | '200 OK' | '201 CREATED' | '202 ACCEPTED' | '203 NON_AUTHORITATIVE_INFORMATION' | '204 NO_CONTENT' | '205 RESET_CONTENT' | '206 PARTIAL_CONTENT' | '207 MULTI_STATUS' | '208 ALREADY_REPORTED' | '226 IM_USED' | '300 MULTIPLE_CHOICES' | '301 MOVED_PERMANENTLY' | '302 FOUND' | '302 MOVED_TEMPORARILY' | '303 SEE_OTHER' | '304 NOT_MODIFIED' | '305 USE_PROXY' | '307 TEMPORARY_REDIRECT' | '308 PERMANENT_REDIRECT' | '400 BAD_REQUEST' | '401 UNAUTHORIZED' | '402 PAYMENT_REQUIRED' | '403 FORBIDDEN' | '404 NOT_FOUND' | '405 METHOD_NOT_ALLOWED' | '406 NOT_ACCEPTABLE' | '407 PROXY_AUTHENTICATION_REQUIRED' | '408 REQUEST_TIMEOUT' | '409 CONFLICT' | '410 GONE' | '411 LENGTH_REQUIRED' | '412 PRECONDITION_FAILED' | '413 PAYLOAD_TOO_LARGE' | '413 REQUEST_ENTITY_TOO_LARGE' | '414 URI_TOO_LONG' | '414 REQUEST_URI_TOO_LONG' | '415 UNSUPPORTED_MEDIA_TYPE' | '416 REQUESTED_RANGE_NOT_SATISFIABLE' | '417 EXPECTATION_FAILED' | '418 I_AM_A_TEAPOT' | '419 INSUFFICIENT_SPACE_ON_RESOURCE' | '420 METHOD_FAILURE' | '421 DESTINATION_LOCKED' | '422 UNPROCESSABLE_ENTITY' | '423 LOCKED' | '424 FAILED_DEPENDENCY' | '425 TOO_EARLY' | '426 UPGRADE_REQUIRED' | '428 PRECONDITION_REQUIRED' | '429 TOO_MANY_REQUESTS' | '431 REQUEST_HEADER_FIELDS_TOO_LARGE' | '451 UNAVAILABLE_FOR_LEGAL_REASONS' | '500 INTERNAL_SERVER_ERROR' | '501 NOT_IMPLEMENTED' | '502 BAD_GATEWAY' | '503 SERVICE_UNAVAILABLE' | '504 GATEWAY_TIMEOUT' | '505 HTTP_VERSION_NOT_SUPPORTED' | '506 VARIANT_ALSO_NEGOTIATES' | '507 INSUFFICIENT_STORAGE' | '508 LOOP_DETECTED' | '509 BANDWIDTH_LIMIT_EXCEEDED' | '510 NOT_EXTENDED' | '511 NETWORK_AUTHENTICATION_REQUIRED'>> {

    const rb = new RequestBuilder(this.rootUrl, OrderInstanceControllerService.FlushPath, 'delete');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<'100 CONTINUE' | '101 SWITCHING_PROTOCOLS' | '102 PROCESSING' | '103 CHECKPOINT' | '200 OK' | '201 CREATED' | '202 ACCEPTED' | '203 NON_AUTHORITATIVE_INFORMATION' | '204 NO_CONTENT' | '205 RESET_CONTENT' | '206 PARTIAL_CONTENT' | '207 MULTI_STATUS' | '208 ALREADY_REPORTED' | '226 IM_USED' | '300 MULTIPLE_CHOICES' | '301 MOVED_PERMANENTLY' | '302 FOUND' | '302 MOVED_TEMPORARILY' | '303 SEE_OTHER' | '304 NOT_MODIFIED' | '305 USE_PROXY' | '307 TEMPORARY_REDIRECT' | '308 PERMANENT_REDIRECT' | '400 BAD_REQUEST' | '401 UNAUTHORIZED' | '402 PAYMENT_REQUIRED' | '403 FORBIDDEN' | '404 NOT_FOUND' | '405 METHOD_NOT_ALLOWED' | '406 NOT_ACCEPTABLE' | '407 PROXY_AUTHENTICATION_REQUIRED' | '408 REQUEST_TIMEOUT' | '409 CONFLICT' | '410 GONE' | '411 LENGTH_REQUIRED' | '412 PRECONDITION_FAILED' | '413 PAYLOAD_TOO_LARGE' | '413 REQUEST_ENTITY_TOO_LARGE' | '414 URI_TOO_LONG' | '414 REQUEST_URI_TOO_LONG' | '415 UNSUPPORTED_MEDIA_TYPE' | '416 REQUESTED_RANGE_NOT_SATISFIABLE' | '417 EXPECTATION_FAILED' | '418 I_AM_A_TEAPOT' | '419 INSUFFICIENT_SPACE_ON_RESOURCE' | '420 METHOD_FAILURE' | '421 DESTINATION_LOCKED' | '422 UNPROCESSABLE_ENTITY' | '423 LOCKED' | '424 FAILED_DEPENDENCY' | '425 TOO_EARLY' | '426 UPGRADE_REQUIRED' | '428 PRECONDITION_REQUIRED' | '429 TOO_MANY_REQUESTS' | '431 REQUEST_HEADER_FIELDS_TOO_LARGE' | '451 UNAVAILABLE_FOR_LEGAL_REASONS' | '500 INTERNAL_SERVER_ERROR' | '501 NOT_IMPLEMENTED' | '502 BAD_GATEWAY' | '503 SERVICE_UNAVAILABLE' | '504 GATEWAY_TIMEOUT' | '505 HTTP_VERSION_NOT_SUPPORTED' | '506 VARIANT_ALSO_NEGOTIATES' | '507 INSUFFICIENT_STORAGE' | '508 LOOP_DETECTED' | '509 BANDWIDTH_LIMIT_EXCEEDED' | '510 NOT_EXTENDED' | '511 NETWORK_AUTHENTICATION_REQUIRED'>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `flush$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  flush(params: {
    restaurantRef: string;
  }): Observable<'100 CONTINUE' | '101 SWITCHING_PROTOCOLS' | '102 PROCESSING' | '103 CHECKPOINT' | '200 OK' | '201 CREATED' | '202 ACCEPTED' | '203 NON_AUTHORITATIVE_INFORMATION' | '204 NO_CONTENT' | '205 RESET_CONTENT' | '206 PARTIAL_CONTENT' | '207 MULTI_STATUS' | '208 ALREADY_REPORTED' | '226 IM_USED' | '300 MULTIPLE_CHOICES' | '301 MOVED_PERMANENTLY' | '302 FOUND' | '302 MOVED_TEMPORARILY' | '303 SEE_OTHER' | '304 NOT_MODIFIED' | '305 USE_PROXY' | '307 TEMPORARY_REDIRECT' | '308 PERMANENT_REDIRECT' | '400 BAD_REQUEST' | '401 UNAUTHORIZED' | '402 PAYMENT_REQUIRED' | '403 FORBIDDEN' | '404 NOT_FOUND' | '405 METHOD_NOT_ALLOWED' | '406 NOT_ACCEPTABLE' | '407 PROXY_AUTHENTICATION_REQUIRED' | '408 REQUEST_TIMEOUT' | '409 CONFLICT' | '410 GONE' | '411 LENGTH_REQUIRED' | '412 PRECONDITION_FAILED' | '413 PAYLOAD_TOO_LARGE' | '413 REQUEST_ENTITY_TOO_LARGE' | '414 URI_TOO_LONG' | '414 REQUEST_URI_TOO_LONG' | '415 UNSUPPORTED_MEDIA_TYPE' | '416 REQUESTED_RANGE_NOT_SATISFIABLE' | '417 EXPECTATION_FAILED' | '418 I_AM_A_TEAPOT' | '419 INSUFFICIENT_SPACE_ON_RESOURCE' | '420 METHOD_FAILURE' | '421 DESTINATION_LOCKED' | '422 UNPROCESSABLE_ENTITY' | '423 LOCKED' | '424 FAILED_DEPENDENCY' | '425 TOO_EARLY' | '426 UPGRADE_REQUIRED' | '428 PRECONDITION_REQUIRED' | '429 TOO_MANY_REQUESTS' | '431 REQUEST_HEADER_FIELDS_TOO_LARGE' | '451 UNAVAILABLE_FOR_LEGAL_REASONS' | '500 INTERNAL_SERVER_ERROR' | '501 NOT_IMPLEMENTED' | '502 BAD_GATEWAY' | '503 SERVICE_UNAVAILABLE' | '504 GATEWAY_TIMEOUT' | '505 HTTP_VERSION_NOT_SUPPORTED' | '506 VARIANT_ALSO_NEGOTIATES' | '507 INSUFFICIENT_STORAGE' | '508 LOOP_DETECTED' | '509 BANDWIDTH_LIMIT_EXCEEDED' | '510 NOT_EXTENDED' | '511 NETWORK_AUTHENTICATION_REQUIRED'> {

    return this.flush$Response(params).pipe(
      map((r: StrictHttpResponse<'100 CONTINUE' | '101 SWITCHING_PROTOCOLS' | '102 PROCESSING' | '103 CHECKPOINT' | '200 OK' | '201 CREATED' | '202 ACCEPTED' | '203 NON_AUTHORITATIVE_INFORMATION' | '204 NO_CONTENT' | '205 RESET_CONTENT' | '206 PARTIAL_CONTENT' | '207 MULTI_STATUS' | '208 ALREADY_REPORTED' | '226 IM_USED' | '300 MULTIPLE_CHOICES' | '301 MOVED_PERMANENTLY' | '302 FOUND' | '302 MOVED_TEMPORARILY' | '303 SEE_OTHER' | '304 NOT_MODIFIED' | '305 USE_PROXY' | '307 TEMPORARY_REDIRECT' | '308 PERMANENT_REDIRECT' | '400 BAD_REQUEST' | '401 UNAUTHORIZED' | '402 PAYMENT_REQUIRED' | '403 FORBIDDEN' | '404 NOT_FOUND' | '405 METHOD_NOT_ALLOWED' | '406 NOT_ACCEPTABLE' | '407 PROXY_AUTHENTICATION_REQUIRED' | '408 REQUEST_TIMEOUT' | '409 CONFLICT' | '410 GONE' | '411 LENGTH_REQUIRED' | '412 PRECONDITION_FAILED' | '413 PAYLOAD_TOO_LARGE' | '413 REQUEST_ENTITY_TOO_LARGE' | '414 URI_TOO_LONG' | '414 REQUEST_URI_TOO_LONG' | '415 UNSUPPORTED_MEDIA_TYPE' | '416 REQUESTED_RANGE_NOT_SATISFIABLE' | '417 EXPECTATION_FAILED' | '418 I_AM_A_TEAPOT' | '419 INSUFFICIENT_SPACE_ON_RESOURCE' | '420 METHOD_FAILURE' | '421 DESTINATION_LOCKED' | '422 UNPROCESSABLE_ENTITY' | '423 LOCKED' | '424 FAILED_DEPENDENCY' | '425 TOO_EARLY' | '426 UPGRADE_REQUIRED' | '428 PRECONDITION_REQUIRED' | '429 TOO_MANY_REQUESTS' | '431 REQUEST_HEADER_FIELDS_TOO_LARGE' | '451 UNAVAILABLE_FOR_LEGAL_REASONS' | '500 INTERNAL_SERVER_ERROR' | '501 NOT_IMPLEMENTED' | '502 BAD_GATEWAY' | '503 SERVICE_UNAVAILABLE' | '504 GATEWAY_TIMEOUT' | '505 HTTP_VERSION_NOT_SUPPORTED' | '506 VARIANT_ALSO_NEGOTIATES' | '507 INSUFFICIENT_STORAGE' | '508 LOOP_DETECTED' | '509 BANDWIDTH_LIMIT_EXCEEDED' | '510 NOT_EXTENDED' | '511 NETWORK_AUTHENTICATION_REQUIRED'>) => r.body as '100 CONTINUE' | '101 SWITCHING_PROTOCOLS' | '102 PROCESSING' | '103 CHECKPOINT' | '200 OK' | '201 CREATED' | '202 ACCEPTED' | '203 NON_AUTHORITATIVE_INFORMATION' | '204 NO_CONTENT' | '205 RESET_CONTENT' | '206 PARTIAL_CONTENT' | '207 MULTI_STATUS' | '208 ALREADY_REPORTED' | '226 IM_USED' | '300 MULTIPLE_CHOICES' | '301 MOVED_PERMANENTLY' | '302 FOUND' | '302 MOVED_TEMPORARILY' | '303 SEE_OTHER' | '304 NOT_MODIFIED' | '305 USE_PROXY' | '307 TEMPORARY_REDIRECT' | '308 PERMANENT_REDIRECT' | '400 BAD_REQUEST' | '401 UNAUTHORIZED' | '402 PAYMENT_REQUIRED' | '403 FORBIDDEN' | '404 NOT_FOUND' | '405 METHOD_NOT_ALLOWED' | '406 NOT_ACCEPTABLE' | '407 PROXY_AUTHENTICATION_REQUIRED' | '408 REQUEST_TIMEOUT' | '409 CONFLICT' | '410 GONE' | '411 LENGTH_REQUIRED' | '412 PRECONDITION_FAILED' | '413 PAYLOAD_TOO_LARGE' | '413 REQUEST_ENTITY_TOO_LARGE' | '414 URI_TOO_LONG' | '414 REQUEST_URI_TOO_LONG' | '415 UNSUPPORTED_MEDIA_TYPE' | '416 REQUESTED_RANGE_NOT_SATISFIABLE' | '417 EXPECTATION_FAILED' | '418 I_AM_A_TEAPOT' | '419 INSUFFICIENT_SPACE_ON_RESOURCE' | '420 METHOD_FAILURE' | '421 DESTINATION_LOCKED' | '422 UNPROCESSABLE_ENTITY' | '423 LOCKED' | '424 FAILED_DEPENDENCY' | '425 TOO_EARLY' | '426 UPGRADE_REQUIRED' | '428 PRECONDITION_REQUIRED' | '429 TOO_MANY_REQUESTS' | '431 REQUEST_HEADER_FIELDS_TOO_LARGE' | '451 UNAVAILABLE_FOR_LEGAL_REASONS' | '500 INTERNAL_SERVER_ERROR' | '501 NOT_IMPLEMENTED' | '502 BAD_GATEWAY' | '503 SERVICE_UNAVAILABLE' | '504 GATEWAY_TIMEOUT' | '505 HTTP_VERSION_NOT_SUPPORTED' | '506 VARIANT_ALSO_NEGOTIATES' | '507 INSUFFICIENT_STORAGE' | '508 LOOP_DETECTED' | '509 BANDWIDTH_LIMIT_EXCEEDED' | '510 NOT_EXTENDED' | '511 NETWORK_AUTHENTICATION_REQUIRED')
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
