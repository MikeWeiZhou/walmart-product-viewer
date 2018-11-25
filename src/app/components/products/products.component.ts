import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

import { Category } from '../../models/category';
import { Product } from '../../models/product';

import { PaginatedService } from 'src/app/services/paginated.service';
import { getLocaleNumberSymbol } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnChanges {

  // Category
  @Input() public Category: Category;

  public Products: Product[];
  public HasNextPage: boolean = false;
  public HasPreviousPage: boolean = false;

  // Paginated Service
  private mPaginated: PaginatedService;

  // Configuration Settings
  private readonly PRODUCTS_PER_PAGE: number = 10;

  // Track Max Item ID of each page
  private mMaxItemId: number[] = [];

  /**
   * Constructor.
   * @param paginated PaginatedService
   */
  constructor(paginated: PaginatedService) {
    this.mPaginated = paginated;
  }

  /**
   * Not used.
   */
  ngOnInit() {
  }

  /**
   * Load first page when Category changes from parent.
   * @param changes SimpleChanges
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.Category.currentValue !== changes.Category.previousValue) {
      this.loadFirstPage();
    }
  }

  /**
   * Loads previous page of products.
   */
  public LoadPreviousPage(): void {
    // There's no previous page
    if (this.mMaxItemId.length < 2) {
      this.LoadNextPage();
      return;
    }

    // Remove current page max item id
    this.mMaxItemId.pop();

    // Need previous 2 page max item ID; This is how Walmart API works.
    const prev2PageMaxItemId: number = (this.mMaxItemId.length < 2)
      ? 0
      : this.mMaxItemId[this.mMaxItemId.length - 2];

    // Load products
    this.mPaginated.GetProducts({
      categoryId:       this.Category.id,
      productsPerPage:  this.PRODUCTS_PER_PAGE,
      prevPageMaxItemId: prev2PageMaxItemId
    }).subscribe((response: any) => {
      this.Products = response.items;

      // API response gives a nextpage regardless if there is one; Faulty Walmart API
      this.HasNextPage = true;
      this.HasPreviousPage = (this.mMaxItemId.length > 1) ? true : false;
    });
  }

  /**
   * Loads next page of products.
   */
  public LoadNextPage(): void {
    // Max item ID for current page
    const currPageMaxItemId: number = (this.mMaxItemId.length === 0)
      ? 0
      : this.mMaxItemId[this.mMaxItemId.length - 1];

    // Load products
    this.mPaginated.GetProducts({
      categoryId:       this.Category.id,
      productsPerPage:  this.PRODUCTS_PER_PAGE,
      prevPageMaxItemId: currPageMaxItemId
    }).subscribe((response: any) => {
      this.Products = response.items;

      // Set Has Next/Previous page
      this.HasNextPage = (response.totalPages > 1) ? true : false;
      this.HasPreviousPage = (this.mMaxItemId.length > 0) ? true : false;

      // add max item id
      const maxItemId = Math.max.apply(Math, this.Products.map(prod => { return prod.itemId; })); // Assumes no order
      this.mMaxItemId.push(maxItemId);
    });
  }

  /**
   * Loads first page of products.
   */
  private loadFirstPage(): void {
    this.mMaxItemId = [];
    this.LoadNextPage();
  }

  /**
   * Returns max item id for previous page of products.
   */
  private getPreviousPageMaxItemId(): number {
    return (this.mMaxItemId.length > 1)
      ? this.mMaxItemId[this.mMaxItemId.length - 2]
      : 0;
  }
}
