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

import { CsrfToken } from '../models/csrf-token';
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
   * Path part for operation csrf
   */
  static readonly CsrfPath = '/api/public/v1/account/login/csrf';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `csrf()` instead.
   *
   * This method doesn't expect any request body.
   */
  csrf$Response(params: {
    token: CsrfToken;
  }): Observable<StrictHttpResponse<CsrfToken>> {

    const rb = new RequestBuilder(this.rootUrl, LoginControllerService.CsrfPath, 'get');
    if (params) {
      rb.query('token', params.token, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CsrfToken>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `csrf$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  csrf(params: {
    token: CsrfToken;
  }): Observable<CsrfToken> {

    return this.csrf$Response(params).pipe(
      map((r: StrictHttpResponse<CsrfToken>) => r.body as CsrfToken)
    );
  }

  /**
   * Path part for operation csrf3
   */
  static readonly Csrf3Path = '/api/public/v1/account/login/csrf';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `csrf3()` instead.
   *
   * This method doesn't expect any request body.
   */
  csrf3$Response(params: {
    token: CsrfToken;
  }): Observable<StrictHttpResponse<CsrfToken>> {

    const rb = new RequestBuilder(this.rootUrl, LoginControllerService.Csrf3Path, 'put');
    if (params) {
      rb.query('token', params.token, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CsrfToken>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `csrf3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  csrf3(params: {
    token: CsrfToken;
  }): Observable<CsrfToken> {

    return this.csrf3$Response(params).pipe(
      map((r: StrictHttpResponse<CsrfToken>) => r.body as CsrfToken)
    );
  }

  /**
   * Path part for operation csrf2
   */
  static readonly Csrf2Path = '/api/public/v1/account/login/csrf';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `csrf2()` instead.
   *
   * This method doesn't expect any request body.
   */
  csrf2$Response(params: {
    token: CsrfToken;
  }): Observable<StrictHttpResponse<CsrfToken>> {

    const rb = new RequestBuilder(this.rootUrl, LoginControllerService.Csrf2Path, 'post');
    if (params) {
      rb.query('token', params.token, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CsrfToken>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `csrf2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  csrf2(params: {
    token: CsrfToken;
  }): Observable<CsrfToken> {

    return this.csrf2$Response(params).pipe(
      map((r: StrictHttpResponse<CsrfToken>) => r.body as CsrfToken)
    );
  }

  /**
   * Path part for operation csrf5
   */
  static readonly Csrf5Path = '/api/public/v1/account/login/csrf';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `csrf5()` instead.
   *
   * This method doesn't expect any request body.
   */
  csrf5$Response(params: {
    token: CsrfToken;
  }): Observable<StrictHttpResponse<CsrfToken>> {

    const rb = new RequestBuilder(this.rootUrl, LoginControllerService.Csrf5Path, 'delete');
    if (params) {
      rb.query('token', params.token, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CsrfToken>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `csrf5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  csrf5(params: {
    token: CsrfToken;
  }): Observable<CsrfToken> {

    return this.csrf5$Response(params).pipe(
      map((r: StrictHttpResponse<CsrfToken>) => r.body as CsrfToken)
    );
  }

  /**
   * Path part for operation csrf6
   */
  static readonly Csrf6Path = '/api/public/v1/account/login/csrf';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `csrf6()` instead.
   *
   * This method doesn't expect any request body.
   */
  csrf6$Response(params: {
    token: CsrfToken;
  }): Observable<StrictHttpResponse<CsrfToken>> {

    const rb = new RequestBuilder(this.rootUrl, LoginControllerService.Csrf6Path, 'options');
    if (params) {
      rb.query('token', params.token, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CsrfToken>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `csrf6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  csrf6(params: {
    token: CsrfToken;
  }): Observable<CsrfToken> {

    return this.csrf6$Response(params).pipe(
      map((r: StrictHttpResponse<CsrfToken>) => r.body as CsrfToken)
    );
  }

  /**
   * Path part for operation csrf1
   */
  static readonly Csrf1Path = '/api/public/v1/account/login/csrf';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `csrf1()` instead.
   *
   * This method doesn't expect any request body.
   */
  csrf1$Response(params: {
    token: CsrfToken;
  }): Observable<StrictHttpResponse<CsrfToken>> {

    const rb = new RequestBuilder(this.rootUrl, LoginControllerService.Csrf1Path, 'head');
    if (params) {
      rb.query('token', params.token, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CsrfToken>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `csrf1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  csrf1(params: {
    token: CsrfToken;
  }): Observable<CsrfToken> {

    return this.csrf1$Response(params).pipe(
      map((r: StrictHttpResponse<CsrfToken>) => r.body as CsrfToken)
    );
  }

  /**
   * Path part for operation csrf4
   */
  static readonly Csrf4Path = '/api/public/v1/account/login/csrf';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `csrf4()` instead.
   *
   * This method doesn't expect any request body.
   */
  csrf4$Response(params: {
    token: CsrfToken;
  }): Observable<StrictHttpResponse<CsrfToken>> {

    const rb = new RequestBuilder(this.rootUrl, LoginControllerService.Csrf4Path, 'patch');
    if (params) {
      rb.query('token', params.token, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CsrfToken>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `csrf4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  csrf4(params: {
    token: CsrfToken;
  }): Observable<CsrfToken> {

    return this.csrf4$Response(params).pipe(
      map((r: StrictHttpResponse<CsrfToken>) => r.body as CsrfToken)
    );
  }

}
