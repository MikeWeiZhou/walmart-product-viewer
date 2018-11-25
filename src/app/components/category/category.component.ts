import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Category } from '../../models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
/**
 * CategoryComponent.
 * 
 * Gets one category and its children.
 */
export class CategoryComponent implements OnInit {

  // Category input/outputs
  @Input() public Category: Category;
  @Output() public CategoryChange: EventEmitter<Category> = new EventEmitter<Category>();

  // Category Service
  private mCategoryService: CategoryService;

  // Track Category Navigation
  // private mCategoryId: string[] = [];

  /**
   * Constructor.
   * @param category CategoryService
   */
  constructor(category: CategoryService) {
    this.mCategoryService = category;
  }

  /**
   * On Angular Initialization.
   * Called after object is constructed.
   */
  ngOnInit() {
  }

  /**
   * Set's this.Category to current directory's parent
   */
  // public SetToParentCategory(): void {
  // }

  /**
   * Set's this.Category to specified category, or root category if not found.
   * @param categoryId specified category ID
   */
  public SetCategory(categoryId: string): void {
    this.mCategoryService.GetCategory(categoryId)
      .subscribe((cat: Category) => {
        this.Category = cat;
        this.CategoryChange.emit(this.Category);

        // // remove unused category IDs
        // // i.e. when navigating to parent category
        // const i: number = this.mCategoryId.findIndex(catId => { return catId == categoryId; });
        // if (i >= 0) {
        //   this.mCategoryId = this.mCategoryId.slice(0, i + 1);
        // }

        // console.log(this.mCategoryId);
      }
    );
  }
}
