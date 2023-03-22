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

import { StatisticsDailySalesGet } from '../models/statistics-daily-sales-get';
import { StatisticsDailySalesGetParams } from '../models/statistics-daily-sales-get-params';
import { StatisticsHourlySalesGet } from '../models/statistics-hourly-sales-get';
import { StatisticsHourlySalesGetParams } from '../models/statistics-hourly-sales-get-params';
import { StatisticsMonthlySalesGet } from '../models/statistics-monthly-sales-get';
import { StatisticsMonthlySalesGetParams } from '../models/statistics-monthly-sales-get-params';

@Injectable({
  providedIn: 'root',
})
export class StatisticsControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getYearSales
   */
  static readonly GetYearSalesPath = '/api/staff/v1/restaurant/{restaurantRef}/statistics/sales/monthly';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getYearSales()` instead.
   *
   * This method doesn't expect any request body.
   */
  getYearSales$Response(params: {
    restaurantRef: string;
    params: StatisticsMonthlySalesGetParams;
  }): Observable<StrictHttpResponse<Array<StatisticsMonthlySalesGet>>> {

    const rb = new RequestBuilder(this.rootUrl, StatisticsControllerService.GetYearSalesPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.query('params', params.params, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<StatisticsMonthlySalesGet>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getYearSales$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getYearSales(params: {
    restaurantRef: string;
    params: StatisticsMonthlySalesGetParams;
  }): Observable<Array<StatisticsMonthlySalesGet>> {

    return this.getYearSales$Response(params).pipe(
      map((r: StrictHttpResponse<Array<StatisticsMonthlySalesGet>>) => r.body as Array<StatisticsMonthlySalesGet>)
    );
  }

  /**
   * Path part for operation getHourlySales
   */
  static readonly GetHourlySalesPath = '/api/staff/v1/restaurant/{restaurantRef}/statistics/sales/hourly';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getHourlySales()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHourlySales$Response(params: {
    restaurantRef: string;
    params: StatisticsHourlySalesGetParams;
  }): Observable<StrictHttpResponse<Array<StatisticsHourlySalesGet>>> {

    const rb = new RequestBuilder(this.rootUrl, StatisticsControllerService.GetHourlySalesPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.query('params', params.params, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<StatisticsHourlySalesGet>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getHourlySales$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHourlySales(params: {
    restaurantRef: string;
    params: StatisticsHourlySalesGetParams;
  }): Observable<Array<StatisticsHourlySalesGet>> {

    return this.getHourlySales$Response(params).pipe(
      map((r: StrictHttpResponse<Array<StatisticsHourlySalesGet>>) => r.body as Array<StatisticsHourlySalesGet>)
    );
  }

  /**
   * Path part for operation getDailySales
   */
  static readonly GetDailySalesPath = '/api/staff/v1/restaurant/{restaurantRef}/statistics/sales/daily';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDailySales()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDailySales$Response(params: {
    restaurantRef: string;
    params: StatisticsDailySalesGetParams;
  }): Observable<StrictHttpResponse<Array<StatisticsDailySalesGet>>> {

    const rb = new RequestBuilder(this.rootUrl, StatisticsControllerService.GetDailySalesPath, 'get');
    if (params) {
      rb.path('restaurantRef', params.restaurantRef, {});
      rb.query('params', params.params, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<StatisticsDailySalesGet>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDailySales$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDailySales(params: {
    restaurantRef: string;
    params: StatisticsDailySalesGetParams;
  }): Observable<Array<StatisticsDailySalesGet>> {

    return this.getDailySales$Response(params).pipe(
      map((r: StrictHttpResponse<Array<StatisticsDailySalesGet>>) => r.body as Array<StatisticsDailySalesGet>)
    );
  }

}
