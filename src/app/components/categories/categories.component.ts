import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Observable } from 'rxjs';

import { Category } from '../../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
/**
 * TestCategoryComponent.
 * 
 * Test CategoryService functionality.
 */
export class CategoriesComponent implements OnInit {

  // Categories Observable (subscribe only in component html)
  public Categories$: Observable<Category[]>;

  // Category Service
  private mCategoryService: CategoryService;

  /**
   * Constructor.
   * @param category CategoryServer
   */
  constructor(category: CategoryService) {
    this.mCategoryService = category;
  }

  /**
   * On Angular Initialization.
   * Called after object is constructed.
   */
  ngOnInit() {
    this.Categories$ = this.mCategoryService.GetCategories();
  }
}
