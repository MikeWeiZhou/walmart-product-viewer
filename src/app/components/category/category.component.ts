import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  // Services
  private mRoute: ActivatedRoute;
  private mCategoryService: CategoryService;

  /**
   * Constructor.
   * @param route ActivatedRoute
   * @param router Router
   * @param category CategoryService
   */
  constructor(route: ActivatedRoute, router: Router, category: CategoryService) {
    this.mRoute = route;
    this.mCategoryService = category;

    // Same route with different parameters will not trigger a refresh
    // i.e. Clicking on child categories does not trigger refresh
    // This setting will trigger a refresh for all components loaded on page
  }

  /**
   * On Angular Initialization.
   * Called after object is constructed.
   */
  ngOnInit() {
  }

  /**
   * Set's this.Category to specified category, or root category if not found.
   * @param categoryId specified category ID
   */
  public SetCurrentCategory(categoryId: string): void {
    this.mCategoryService.GetCategory(categoryId)
      .subscribe((cat: Category) => {
        this.Category = cat;
        this.CategoryChange.emit(this.Category);
      }
    );
  }
}
