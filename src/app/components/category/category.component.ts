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
  // Synchronizes Category with parent components
  @Output() public CategoryChange: EventEmitter<Category> = new EventEmitter<Category>();
  private _category: Category;
  @Input()
  get Category() { return this._category; }
  set Category(cat: Category) { this._category = cat; this.CategoryChange.emit(this._category); }

  // Category Service
  private mCategoryService: CategoryService;

  /**
   * Constructor.
   * @param category CategoryService
   */
  constructor(category: CategoryService) {
    this.mCategoryService = category;
  }

  /**
   * Not used.
   */
  ngOnInit() {
  }

  /**
   * Set's this.Category to specified category, or root category if not found.
   * @param categoryId specified category ID
   */
  public SetCategory(categoryId: string): void {
    this.mCategoryService.GetCategory(categoryId)
      .subscribe((cat: Category) => {
        this.Category = cat;
      }
    );
  }
}
