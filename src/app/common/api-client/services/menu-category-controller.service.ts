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

import { MenuCategoryData } from '../models/menu-category-data';
import { MenuCategoryGet } from '../models/menu-category-get';
import { StatusResponse } from '../models/status-response';

@Injectable({
  providedIn: 'root',
})
export class MenuCategoryControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation putCategory
   */
  static readonly PutCategoryPath = '/api/staff/v1/restaurant/{restaurantRef}/menu-categories/{categoryRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putCategory$Response(params: {
    restaurantRef: string;
    categoryRef: string;
    body: MenuCategoryData
  }): Observable<StrictHttpResponse<MenuCategoryGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuCategoryControllerService.PutCategoryPath, 'put');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('categoryRef', params.categoryRef, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MenuCategoryGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putCategory(params: {
    restaurantRef: string;
    categoryRef: string;
    body: MenuCategoryData
  }): Observable<MenuCategoryGet> {

    return this.putCategory$Response(params).pipe(
      map((r: StrictHttpResponse<MenuCategoryGet>) => r.body as MenuCategoryGet)
    );
  }

  /**
   * Path part for operation deleteCategory
   */
  static readonly DeleteCategoryPath = '/api/staff/v1/restaurant/{restaurantRef}/menu-categories/{categoryRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCategory$Response(params: {
    restaurantRef: string;
    categoryRef: string;
  }): Observable<StrictHttpResponse<StatusResponse>> {

    const rb = new RequestBuilder(this.rootUrl, MenuCategoryControllerService.DeleteCategoryPath, 'delete');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('categoryRef', params.categoryRef, {});
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
   * To access the full response (for headers, for example), `deleteCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCategory(params: {
    restaurantRef: string;
    categoryRef: string;
  }): Observable<StatusResponse> {

    return this.deleteCategory$Response(params).pipe(
      map((r: StrictHttpResponse<StatusResponse>) => r.body as StatusResponse)
    );
  }

  /**
   * Path part for operation moveUp4
   */
  static readonly MoveUp4Path = '/api/staff/v1/restaurant/{restaurantRef}/menu-categories/{categoryRef}/element-order/up';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `moveUp4()` instead.
   *
   * This method doesn't expect any request body.
   */
  moveUp4$Response(params: {
    restaurantRef: string;
    categoryRef: string;
  }): Observable<StrictHttpResponse<MenuCategoryGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuCategoryControllerService.MoveUp4Path, 'put');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('categoryRef', params.categoryRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MenuCategoryGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `moveUp4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  moveUp4(params: {
    restaurantRef: string;
    categoryRef: string;
  }): Observable<MenuCategoryGet> {

    return this.moveUp4$Response(params).pipe(
      map((r: StrictHttpResponse<MenuCategoryGet>) => r.body as MenuCategoryGet)
    );
  }

  /**
   * Path part for operation moveDown4
   */
  static readonly MoveDown4Path = '/api/staff/v1/restaurant/{restaurantRef}/menu-categories/{categoryRef}/element-order/down';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `moveDown4()` instead.
   *
   * This method doesn't expect any request body.
   */
  moveDown4$Response(params: {
    restaurantRef: string;
    categoryRef: string;
  }): Observable<StrictHttpResponse<MenuCategoryGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuCategoryControllerService.MoveDown4Path, 'put');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('categoryRef', params.categoryRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MenuCategoryGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `moveDown4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  moveDown4(params: {
    restaurantRef: string;
    categoryRef: string;
  }): Observable<MenuCategoryGet> {

    return this.moveDown4$Response(params).pipe(
      map((r: StrictHttpResponse<MenuCategoryGet>) => r.body as MenuCategoryGet)
    );
  }

  /**
   * Path part for operation postCategory
   */
  static readonly PostCategoryPath = '/api/staff/v1/restaurant/{restaurantRef}/menu-categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postCategory$Response(params: {
    restaurantRef: string;
    body: MenuCategoryData
  }): Observable<StrictHttpResponse<MenuCategoryGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuCategoryControllerService.PostCategoryPath, 'post');
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
        return r as StrictHttpResponse<MenuCategoryGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postCategory(params: {
    restaurantRef: string;
    body: MenuCategoryData
  }): Observable<MenuCategoryGet> {

    return this.postCategory$Response(params).pipe(
      map((r: StrictHttpResponse<MenuCategoryGet>) => r.body as MenuCategoryGet)
    );
  }

  /**
   * Path part for operation getCategories
   */
  static readonly GetCategoriesPath = '/api/public/v1/restaurant/{restaurantRef}/menu-categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategories$Response(params: {
    restaurantRef: string;
  }): Observable<StrictHttpResponse<Array<MenuCategoryGet>>> {

    const rb = new RequestBuilder(this.rootUrl, MenuCategoryControllerService.GetCategoriesPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<MenuCategoryGet>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategories(params: {
    restaurantRef: string;
  }): Observable<Array<MenuCategoryGet>> {

    return this.getCategories$Response(params).pipe(
      map((r: StrictHttpResponse<Array<MenuCategoryGet>>) => r.body as Array<MenuCategoryGet>)
    );
  }

  /**
   * Path part for operation getCategory
   */
  static readonly GetCategoryPath = '/api/public/v1/restaurant/{restaurantRef}/menu-categories/{categoryRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategory$Response(params: {
    restaurantRef: string;
    categoryRef: string;
  }): Observable<StrictHttpResponse<MenuCategoryGet>> {

    const rb = new RequestBuilder(this.rootUrl, MenuCategoryControllerService.GetCategoryPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('categoryRef', params.categoryRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MenuCategoryGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategory(params: {
    restaurantRef: string;
    categoryRef: string;
  }): Observable<MenuCategoryGet> {

    return this.getCategory$Response(params).pipe(
      map((r: StrictHttpResponse<MenuCategoryGet>) => r.body as MenuCategoryGet)
    );
  }

}
