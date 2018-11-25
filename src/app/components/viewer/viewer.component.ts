import { Component, OnInit } from '@angular/core';

import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  // Category
  public Category: Category;

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
   * On Angular Initialization.
   * Called after object is constructed.
   */
  ngOnInit() {
    this.setRootCategory();
  }

  /**
   * Sets this.Category with the root category.
   */
  private setRootCategory(): void {
    this.mCategoryService.GetCategory()
      .subscribe((cat: Category) => {
        this.Category = cat;
      }
    );
  }
}
