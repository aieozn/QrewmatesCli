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

import { CreateUserData } from '../models/create-user-data';
import { UpdateUserData } from '../models/update-user-data';
import { UserDetailsGet } from '../models/user-details-get';

@Injectable({
  providedIn: 'root',
})
export class UsersControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getUser
   */
  static readonly GetUserPath = '/api/staff/v1/restaurant/{restaurantRef}/users/{userRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUser$Response(params: {
    restaurantRef: string;
    userRef: string;
  }): Observable<StrictHttpResponse<UserDetailsGet>> {

    const rb = new RequestBuilder(this.rootUrl, UsersControllerService.GetUserPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('userRef', params.userRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserDetailsGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUser(params: {
    restaurantRef: string;
    userRef: string;
  }): Observable<UserDetailsGet> {

    return this.getUser$Response(params).pipe(
      map((r: StrictHttpResponse<UserDetailsGet>) => r.body as UserDetailsGet)
    );
  }

  /**
   * Path part for operation putUser
   */
  static readonly PutUserPath = '/api/staff/v1/restaurant/{restaurantRef}/users/{userRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putUser$Response(params: {
    restaurantRef: string;
    userRef: string;
    body: UpdateUserData
  }): Observable<StrictHttpResponse<UserDetailsGet>> {

    const rb = new RequestBuilder(this.rootUrl, UsersControllerService.PutUserPath, 'put');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('userRef', params.userRef, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserDetailsGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putUser(params: {
    restaurantRef: string;
    userRef: string;
    body: UpdateUserData
  }): Observable<UserDetailsGet> {

    return this.putUser$Response(params).pipe(
      map((r: StrictHttpResponse<UserDetailsGet>) => r.body as UserDetailsGet)
    );
  }

  /**
   * Path part for operation getUsers
   */
  static readonly GetUsersPath = '/api/staff/v1/restaurant/{restaurantRef}/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsers$Response(params: {
    restaurantRef: string;
  }): Observable<StrictHttpResponse<Array<UserDetailsGet>>> {

    const rb = new RequestBuilder(this.rootUrl, UsersControllerService.GetUsersPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<UserDetailsGet>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsers(params: {
    restaurantRef: string;
  }): Observable<Array<UserDetailsGet>> {

    return this.getUsers$Response(params).pipe(
      map((r: StrictHttpResponse<Array<UserDetailsGet>>) => r.body as Array<UserDetailsGet>)
    );
  }

  /**
   * Path part for operation postUser
   */
  static readonly PostUserPath = '/api/staff/v1/restaurant/{restaurantRef}/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postUser$Response(params: {
    restaurantRef: string;
    body: CreateUserData
  }): Observable<StrictHttpResponse<UserDetailsGet>> {

    const rb = new RequestBuilder(this.rootUrl, UsersControllerService.PostUserPath, 'post');
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
        return r as StrictHttpResponse<UserDetailsGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postUser(params: {
    restaurantRef: string;
    body: CreateUserData
  }): Observable<UserDetailsGet> {

    return this.postUser$Response(params).pipe(
      map((r: StrictHttpResponse<UserDetailsGet>) => r.body as UserDetailsGet)
    );
  }

}
