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


@Injectable({
  providedIn: 'root',
})
export class QrCodeControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getQrImage
   */
  static readonly GetQrImagePath = '/api/staff/v1/restaurant/{restaurantRef}/qr-code/{qrCodeRef}/image';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getQrImage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQrImage$Response(params: {
    restaurantRef: string;
    qrCodeRef: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, QrCodeControllerService.GetQrImagePath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.path('qrCodeRef', params.qrCodeRef, {});
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
   * To access the full response (for headers, for example), `getQrImage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getQrImage(params: {
    restaurantRef: string;
    qrCodeRef: string;
  }): Observable<Blob> {

    return this.getQrImage$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
