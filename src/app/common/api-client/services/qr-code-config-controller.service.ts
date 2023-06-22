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

import { QrCodeConfigGet } from '../models/qr-code-config-get';

@Injectable({
  providedIn: 'root',
})
export class QrCodeConfigControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getConfigs
   */
  static readonly GetConfigsPath = '/api/staff/v1/restaurant/{restaurantRef}/qr-code-configs';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getConfigs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConfigs$Response(params: {
    restaurantRef: string;
  }): Observable<StrictHttpResponse<Array<QrCodeConfigGet>>> {

    const rb = new RequestBuilder(this.rootUrl, QrCodeConfigControllerService.GetConfigsPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<QrCodeConfigGet>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getConfigs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConfigs(params: {
    restaurantRef: string;
  }): Observable<Array<QrCodeConfigGet>> {

    return this.getConfigs$Response(params).pipe(
      map((r: StrictHttpResponse<Array<QrCodeConfigGet>>) => r.body as Array<QrCodeConfigGet>)
    );
  }

  /**
   * Path part for operation getConfigs1
   */
  static readonly GetConfigs1Path = '/api/staff/v1/restaurant/{restaurantRef}/qr-code-configs/{ref}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getConfigs1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConfigs1$Response(params: {
    restaurantRef: string;
    ref: string;
  }): Observable<StrictHttpResponse<QrCodeConfigGet>> {

    const rb = new RequestBuilder(this.rootUrl, QrCodeConfigControllerService.GetConfigs1Path, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('ref', params.ref, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<QrCodeConfigGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getConfigs1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getConfigs1(params: {
    restaurantRef: string;
    ref: string;
  }): Observable<QrCodeConfigGet> {

    return this.getConfigs1$Response(params).pipe(
      map((r: StrictHttpResponse<QrCodeConfigGet>) => r.body as QrCodeConfigGet)
    );
  }

}
