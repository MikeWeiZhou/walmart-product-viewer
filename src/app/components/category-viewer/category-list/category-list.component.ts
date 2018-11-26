import { Component, OnInit, Input } from '@angular/core';

import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
/**
 * CategoryListComponent.
 * 
 * Recursively lists all categories.
 */
export class CategoryListComponent implements OnInit {

  // Passed in from caller component template
  @Input() public Category: Category;

  // Is Category expanded?
  public IsExpanded: boolean;

  /**
   * Constructor.
   */
  constructor() {
  }

  /**
   * On Angular Initialization.
   * Called after object is constructed.
   */
  ngOnInit() {
  }

  /**
   * Toggle child Categories visibility.
   */
  public OnClickCategory(): void {
    this.IsExpanded = !this.IsExpanded;
  }
}
