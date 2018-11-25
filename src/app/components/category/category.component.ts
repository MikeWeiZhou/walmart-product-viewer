import { Component, OnInit, Input } from '@angular/core';

import { Category } from '../../models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

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
