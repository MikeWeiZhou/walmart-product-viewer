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
  // One page of products
  public Products: Product[];

  // Paginated Service
  private mPaginated: PaginatedService;

  // Configuration Settings
  private readonly PRODUCTS_PER_PAGE: number = 10;

  // Track Max Item ID of each page
  private mMaxItemId: number[] = [];

  constructor(paginated: PaginatedService) {
    this.mPaginated = paginated;
  }

  /**
   * On Angular Initialization.
   * Called after object is constructed.
   */
  ngOnInit() {
  }

  /**
   * On Angular Data Change.
   * @param changes SimpleChanges
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.Category.currentValue !== changes.Category.previousValue) {
      this.loadNextPage();
    }
  }

  private loadPrevPage(): void {
  }

  private loadNextPage(): void {
    this.mPaginated.GetProducts({
      categoryId:       this.Category.id,
      productsPerPage:  this.PRODUCTS_PER_PAGE,
      prevPageMaxItemId: this.getCurrPageMaxItemId()
    }).subscribe((response: any) => {
      this.Products = response.items;

      // add max item id
      const maxItemId = Math.max.apply(Math, this.Products.map(prod => { return prod.itemId; })); // Assumes no order
      // const maxItemId = this.Products[this.Products.length - 1].itemId; // Assumes ascending order
      this.mMaxItemId.push(maxItemId);
    });
  }

  private getCurrPageMaxItemId(): number  {
    return (this.mMaxItemId.length === 0)
      ? 0
      : this.mMaxItemId[this.mMaxItemId.length - 1];
  }
}
