import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError, ObservableInput } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Category } from '../models/category';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
/**
 * CategoryService.
 * 
 * Serves category data. Interfaces with Walmart API (endpoints based on environment config).
 */
export class CategoryService {

  // Services
  private readonly mHttp: HttpClient;
  private readonly mLogger: LoggerService;

  // API Configuration (from environment config)
  private readonly API_KEY: string = environment.WALMART.API_KEY;
  private readonly API_URL: string = environment.WALMART.API_ENDPOINTS.TAXONOMY;
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
   * Returns a nested Category array, or empty array.
   * @param [parent] category id or Category object
   * @returns Observable<Category[]>, Category[] may be empty array
   */
  public GetCategories(): Observable<Category[]> {
    return this.mHttp.get<any>(this.ACCESS_URL)
      .pipe(
        map(response => {
          // map response.categories as the return value
          return response.categories;
        }),
        catchError(
          this.handleHttpErrorResponse<Category[]>('CategoryService', [])
        )
      );
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
          'CategoryService',
          error.error.message,
          error.error
        );
      }

      // Backend returned unsuccessful response code
      else {
        this.mLogger.LogError(
          'CategoryService',
          `Backend response code: ${error.status}`,
          error.error
        );
      }

      // Return default result as Observable<T> to subscribers
      return of(defaultResult as T);
    };
  }
}
