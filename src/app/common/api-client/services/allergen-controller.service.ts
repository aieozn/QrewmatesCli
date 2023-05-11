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

import { AllergenData } from '../models/allergen-data';
import { AllergenGet } from '../models/allergen-get';

@Injectable({
  providedIn: 'root',
})
export class AllergenControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllergen
   */
  static readonly GetAllergenPath = '/api/staff/v1/restaurant/{restaurantRef}/allergens/{allergenRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllergen()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllergen$Response(params: {
    restaurantRef: string;
    allergenRef: string;
  }): Observable<StrictHttpResponse<AllergenGet>> {

    const rb = new RequestBuilder(this.rootUrl, AllergenControllerService.GetAllergenPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('allergenRef', params.allergenRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AllergenGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllergen$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllergen(params: {
    restaurantRef: string;
    allergenRef: string;
  }): Observable<AllergenGet> {

    return this.getAllergen$Response(params).pipe(
      map((r: StrictHttpResponse<AllergenGet>) => r.body as AllergenGet)
    );
  }

  /**
   * Path part for operation updateAllergen
   */
  static readonly UpdateAllergenPath = '/api/staff/v1/restaurant/{restaurantRef}/allergens/{allergenRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAllergen()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAllergen$Response(params: {
    restaurantRef: string;
    allergenRef: string;
    body: AllergenData
  }): Observable<StrictHttpResponse<AllergenGet>> {

    const rb = new RequestBuilder(this.rootUrl, AllergenControllerService.UpdateAllergenPath, 'put');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('allergenRef', params.allergenRef, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AllergenGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateAllergen$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAllergen(params: {
    restaurantRef: string;
    allergenRef: string;
    body: AllergenData
  }): Observable<AllergenGet> {

    return this.updateAllergen$Response(params).pipe(
      map((r: StrictHttpResponse<AllergenGet>) => r.body as AllergenGet)
    );
  }

  /**
   * Path part for operation deleteAllergen
   */
  static readonly DeleteAllergenPath = '/api/staff/v1/restaurant/{restaurantRef}/allergens/{allergenRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAllergen()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAllergen$Response(params: {
    restaurantRef: string;
    allergenRef: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AllergenControllerService.DeleteAllergenPath, 'delete');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('allergenRef', params.allergenRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAllergen$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAllergen(params: {
    restaurantRef: string;
    allergenRef: string;
  }): Observable<void> {

    return this.deleteAllergen$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAllergens
   */
  static readonly GetAllergensPath = '/api/staff/v1/restaurant/{restaurantRef}/allergens';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllergens()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllergens$Response(params: {
    restaurantRef: string;
  }): Observable<StrictHttpResponse<Array<AllergenGet>>> {

    const rb = new RequestBuilder(this.rootUrl, AllergenControllerService.GetAllergensPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
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
   * To access the full response (for headers, for example), `getAllergens$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllergens(params: {
    restaurantRef: string;
  }): Observable<Array<AllergenGet>> {

    return this.getAllergens$Response(params).pipe(
      map((r: StrictHttpResponse<Array<AllergenGet>>) => r.body as Array<AllergenGet>)
    );
  }

  /**
   * Path part for operation createAllergen
   */
  static readonly CreateAllergenPath = '/api/staff/v1/restaurant/{restaurantRef}/allergens';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createAllergen()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAllergen$Response(params: {
    restaurantRef: string;
    body: AllergenData
  }): Observable<StrictHttpResponse<AllergenGet>> {

    const rb = new RequestBuilder(this.rootUrl, AllergenControllerService.CreateAllergenPath, 'post');
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
        return r as StrictHttpResponse<AllergenGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createAllergen$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAllergen(params: {
    restaurantRef: string;
    body: AllergenData
  }): Observable<AllergenGet> {

    return this.createAllergen$Response(params).pipe(
      map((r: StrictHttpResponse<AllergenGet>) => r.body as AllergenGet)
    );
  }

}
