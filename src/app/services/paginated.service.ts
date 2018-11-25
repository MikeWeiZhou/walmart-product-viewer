import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ObservableInput } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Product } from '../models/product';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
/**
 * PaginatedService.
 * 
 * Serves paginated products data. Interfaces with Paginated Products API (endpoints based on environment config).
 * https://developer.walmartlabs.com/docs/read/Paginated_Products_API
 */
export class PaginatedService {

  // Services
  private readonly mHttp: HttpClient;
  private readonly mLogger: LoggerService;

  // API Configuration (from environment config)
  private readonly API_KEY: string = environment.WALMART.API_KEY;
  private readonly API_URL: string = environment.WALMART.API_ENDPOINTS.PAGINATED;
  private readonly ACCESS_URL = `${this.API_URL}?format=json&apiKey=${this.API_KEY}`;

  /**
   * Constructor.
   * @param http HttpClient
   * @param logger LoggerService
   */
  constructor(http: HttpClient, logger: LoggerService) {
    this.mHttp = http;
    this.mLogger = logger;
  }

  /**
   * Returns one page of products as an array.
   * @param [options] paginated options
   * @returns Observable<{}>, may be empty object
   */
  public GetProducts(
    options?: {
      categoryId?: string,        // Category ID
      productsPerPage?: number,   // Products Listed Per Page
      prevPageMaxItemId?: number  // Current Page's Max Item ID
    }
  ): Observable<any> {
    const url: string = this.getPageUrl(options);
    return this.mHttp.get<any>(url)
      .pipe(
        catchError(
          // handle error and return empty object
          this.handleHttpErrorResponse<{}>('PaginatedService', {})
        )
      );
  }

  /**
   * Returns the URL to the page, or first page if no options specified.
   * @param [options] paginated options
   * @returns URL as a string
   */
  private getPageUrl(
    options?: {
      categoryId?: string,        // Category ID
      productsPerPage?: number,   // Products Listed Per Page
      prevPageMaxItemId?: number  // Current Page's Max Item ID
    }
  ): string {
    let url: string = this.ACCESS_URL;

    if (options) {
      if (options.categoryId)         { url += `&category=${options.categoryId}`; }
      if (options.productsPerPage)    { url += `&count=${options.productsPerPage}`; }
      if (options.prevPageMaxItemId)  { url += `&maxItemId=${options.prevPageMaxItemId}`; }
    }

    return url;
  }

  /**
   * Handles HttpErrorResponse errors for Observables and returns default result to subscribers.
   * @param tag for grouping this error
   * @param defaultResult default result to return to subscribers
   * @returns an anoymyous function that handle errors and returns an Observable[]
   */
  private handleHttpErrorResponse<T>(tag: string, defaultResult: T): (err: any, caught: Observable<any>) => ObservableInput<{}> {
    /**
     * @param error HttpErrorResponse containing response errors and RxJS's ErrorEvents
     * @returns default result as Observable<T>
     */
    return (error: any): Observable<T> => {
      // Client-side or network error
      if (
        error.error &&
        error.error.message &&
        error.error instanceof ErrorEvent
      ) {
        this.mLogger.LogError(
          tag,
          error.error.message,
          error.error
        );
      }

      // Backend returned unsuccessful response code
      else {
        this.mLogger.LogError(
          tag,
          `Backend response code: ${error.status}`,
          error.error
        );
      }

      // Return default result as Observable<T> to subscribers
      return of(defaultResult as T);
    };
  }
}
