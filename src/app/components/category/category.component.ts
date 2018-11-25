import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from '../../models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
/**
 * TestCategoryComponent.
 * 
 * Test CategoryService functionality.
 */
export class CategoryComponent implements OnInit {

  // Category
  public Category: Category;

  // Services
  private mRoute: ActivatedRoute;
  private mCategoryService: CategoryService;

  /**
   * Constructor.
   * @param category CategoryServer
   */
  constructor(route: ActivatedRoute, router: Router, category: CategoryService) {
    this.mRoute = route;
    this.mCategoryService = category;

    // Same route with different parameters will not trigger a refresh
    // i.e. Clicking on child categories does not trigger refresh
    // This setting will trigger a refresh
    router.routeReuseStrategy.shouldReuseRoute = () => { return false; };
  }

  /**
   * On Angular Initialization.
   * Called after object is constructed.
   */
  ngOnInit() {
    this.getCategory();
  }

  /**
   * Get Category.
   */
  private getCategory(): void {

    // category ID from URL (router)
    let id: string = this.mRoute.snapshot.paramMap.get('categoryId');

    // Get root category and its children
    if (id === null) {
      this.mCategoryService.GetCategory()
        .subscribe((cat: Category) => { this.Category = cat; });
    }

    // Get selected category and its children
    else {
      this.mCategoryService.GetCategory(id)
        .subscribe((cat: Category) => { this.Category = cat; });
    }
  }
}
