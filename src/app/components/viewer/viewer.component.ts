import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
/**
 * ViewerComponent.
 * 
 * Views products by selected Category.
 */
export class ViewerComponent implements OnInit {

  // Category
  public Category: Category;

  // Services
  private mCategoryService: CategoryService;
  private mRoute: ActivatedRoute;

  /**
   * Constructor.
   * @param category CategoryService
   */
  constructor(category: CategoryService, route: ActivatedRoute) {
    this.mCategoryService = category;
    this.mRoute = route;
  }

  /**
   * On Angular Initialization.
   * Called after object is constructed.
   */
  ngOnInit() {
    const categoryId: string = this.mRoute.snapshot.paramMap.get('categoryId');
    this.setCategory(categoryId);
  }

  /**
   * Set's this.Category to specified category, or root category if not found.
   * @param [categoryId] specified category ID
   */
  public setCategory(categoryId?: string): void {
    this.mCategoryService.GetCategory(categoryId)
      .subscribe((cat: Category) => {
        this.Category = cat;
      }
    );
  }
}
