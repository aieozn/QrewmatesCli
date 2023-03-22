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

import { MultimediaGet } from '../models/multimedia-get';

@Injectable({
  providedIn: 'root',
})
export class MultimediaControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation postMultimedia
   */
  static readonly PostMultimediaPath = '/api/staff/v1/restaurant/{restaurantRef}/multimedia';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postMultimedia()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  postMultimedia$Response(params: {
    type: 'IMAGE_PNG' | 'IMAGE_JPEG' | 'FILE_TXT' | 'IMAGE_SVG';
    restaurantRef: string;
    body?: {
'file': Blob;
}
  }): Observable<StrictHttpResponse<MultimediaGet>> {

    const rb = new RequestBuilder(this.rootUrl, MultimediaControllerService.PostMultimediaPath, 'post');
    if (params) {
      rb.query('type', params.type, {});
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MultimediaGet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postMultimedia$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  postMultimedia(params: {
    type: 'IMAGE_PNG' | 'IMAGE_JPEG' | 'FILE_TXT' | 'IMAGE_SVG';
    restaurantRef: string;
    body?: {
'file': Blob;
}
  }): Observable<MultimediaGet> {

    return this.postMultimedia$Response(params).pipe(
      map((r: StrictHttpResponse<MultimediaGet>) => r.body as MultimediaGet)
    );
  }

  /**
   * Path part for operation getMultimedia
   */
  static readonly GetMultimediaPath = '/api/public/v1/restaurant/{restaurantRef}/multimedia/{multimediaRef}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMultimedia()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMultimedia$Response(params: {
    restaurantRef: string;
    multimediaRef: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, MultimediaControllerService.GetMultimediaPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('multimediaRef', params.multimediaRef, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getMultimedia$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMultimedia(params: {
    restaurantRef: string;
    multimediaRef: string;
  }): Observable<Blob> {

    return this.getMultimedia$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
