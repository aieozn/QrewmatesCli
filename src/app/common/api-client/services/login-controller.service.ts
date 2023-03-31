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

import { LocalAccountLoginRequest } from '../models/local-account-login-request';
import { LoginResponse } from '../models/login-response';
import { SocialAccountLoginRequest } from '../models/social-account-login-request';

@Injectable({
  providedIn: 'root',
})
export class LoginControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation socialLogin
   */
  static readonly SocialLoginPath = '/api/public/v1/account/login/social';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `socialLogin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  socialLogin$Response(params: {
    body: SocialAccountLoginRequest
  }): Observable<StrictHttpResponse<LoginResponse>> {

    const rb = new RequestBuilder(this.rootUrl, LoginControllerService.SocialLoginPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoginResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `socialLogin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  socialLogin(params: {
    body: SocialAccountLoginRequest
  }): Observable<LoginResponse> {

    return this.socialLogin$Response(params).pipe(
      map((r: StrictHttpResponse<LoginResponse>) => r.body as LoginResponse)
    );
  }

  /**
   * Path part for operation localLogin
   */
  static readonly LocalLoginPath = '/api/public/v1/account/login/local';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `localLogin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  localLogin$Response(params: {
    body: LocalAccountLoginRequest
  }): Observable<StrictHttpResponse<LoginResponse>> {

    const rb = new RequestBuilder(this.rootUrl, LoginControllerService.LocalLoginPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoginResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `localLogin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  localLogin(params: {
    body: LocalAccountLoginRequest
  }): Observable<LoginResponse> {

    return this.localLogin$Response(params).pipe(
      map((r: StrictHttpResponse<LoginResponse>) => r.body as LoginResponse)
    );
  }

}
