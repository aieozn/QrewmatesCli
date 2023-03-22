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

import { OrderActionData } from '../models/order-action-data';
import { OrderDetailsGet } from '../models/order-details-get';

@Injectable({
  providedIn: 'root',
})
export class OrderStatusControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateStatus
   */
  static readonly UpdateStatusPath = '/api/staff/v1/restaurant/{restaurantRef}/order-instances/{orderInstanceRef}/status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateStatus()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateStatus$Response(params: {
    restaurantRef: string;
    orderInstanceRef: string;
    body: OrderActionData
  }): Observable<StrictHttpResponse<OrderDetailsGet>> {

    const rb = new RequestBuilder(this.rootUrl, OrderStatusControllerService.UpdateStatusPath, 'put');
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
   * To access the full response (for headers, for example), `updateStatus$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateStatus(params: {
    restaurantRef: string;
    orderInstanceRef: string;
    body: OrderActionData
  }): Observable<OrderDetailsGet> {

    return this.updateStatus$Response(params).pipe(
      map((r: StrictHttpResponse<OrderDetailsGet>) => r.body as OrderDetailsGet)
    );
  }

}
