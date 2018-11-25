import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ObservableInput } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { TaxonomyValidMock } from '../mockdata/taxonomy-valid.mock';

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
   * @param [categoryId] selected category id
   * @returns Observable<Category[]>, Category[] may be empty array
   */
  public GetCategory(categoryId?: string): Observable<Category> {
    return of(TaxonomyValidMock)
    // return this.mHttp.get<any>(this.ACCESS_URL)
      .pipe(
        map(response => {
          // put all categories under one root category
          const rootCategory: Category = {
            id: '',
            name: 'All Categories',
            path: '',
            children: response.categories
          };

          // return selected category, if found
          if (categoryId) {
            let category: Category = this.getCategoryFromIdOrNull(categoryId, rootCategory);
            if (category != null) {
              return category;
            }
          }

          // return root category by default
          return rootCategory;
        }),

        catchError(
          // handle error and return a blank Category object
          this.handleHttpErrorResponse<Category>(
            'CategoryService', {
              id: '',
              name: '',
              path: '',
              children: null
            }
          )
        )
      );
  }

  /**
   * Recursively search and return Category with a specified ID, or returns null.
   * @param findCatId Category ID to look for
   * @param category to look in, including children categories
   */
  private getCategoryFromIdOrNull(findCatId: string, category: Category) {

    // Found category
    if (category.id == findCatId) {
      return category;
    }

    // Search children categories recursively
    else if (category.children) {
      let result: Category = null;
      for (let i = 0; result === null && i < category.children.length; ++i) {
        result = this.getCategoryFromIdOrNull(findCatId, category.children[i]);
      }
      return result;
    }

    // Can not find
    return null;
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
