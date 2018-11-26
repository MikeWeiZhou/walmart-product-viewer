import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Observable, of } from 'rxjs';

import { Category } from '../../models/category';

@Component({
  selector: 'app-category-viewer',
  templateUrl: './category-viewer.component.html',
  styleUrls: ['./category-viewer.component.css']
})
/**
 * CategoryViewerComponent.
 * 
 * Views all categories.
 */
export class CategoryViewerComponent implements OnInit {

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
    this.mCategoryService.GetCategory()
      .subscribe((cat: Category) => {
        this.Categories$ = of(cat.children);
      }
    );
  }
}
