import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { Category } from '../../models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnChanges {

  // Current Category input/outputs
  // Synchronizes Category with parent components
  @Output() public CategoryChange: EventEmitter<Category> = new EventEmitter<Category>();
  private _category: Category;
  @Input()
  get Category() { return this._category; }
  set Category(cat: Category) { this._category = cat; this.CategoryChange.emit(this._category); }

  // Navigation
  public NavigationTree: Category[] = [];

  // Category Service
  private mCategoryService: CategoryService;

  /**
   * Constructor.
   * @param categoryService CategoryService
   */
  constructor(categoryService: CategoryService) {
    this.mCategoryService = categoryService;
  }

  /**
   * Not used.
   */
  ngOnInit() {
  }

  /**
   * Update navigation tree when current Category changes.
   * @param changes SimpleChanges
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.Category.currentValue !== changes.Category.previousValue) {
      this.updateNavigationTree(changes.Category.previousValue, changes.Category.currentValue);
    }
  }

  /**
   * Set's this.Category to specified category.
   * @param cat Category
   */
  public SetCategory(cat: Category): void {
    this.Category = cat;
  }

  /**
   * Updates navigation tree.
   * Note: Can only navigate one level only (i.e. parent -> child or vice versa)
   *       CAN NOT navigate multi-levels (e.g. grandparent -> child or vice versa)
   * @param oldCategory Category
   * @param newCategory Category
   */
  private updateNavigationTree(oldCategory: Category, newCategory: Category): void {
    // No existing tree
    if (!oldCategory) {
      this.NavigationTree.push(newCategory);
      return;
    }

    // Navigating from parent to child
    if (oldCategory.children)  {
      const isParentToChild: boolean =
        (undefined != oldCategory.children.find(cat => { return cat.id === newCategory.id; }));
      if (isParentToChild) {
        this.NavigationTree.push(newCategory);
        return;
      }
    }

    // New category is inside Navigation Tree
    const i: number = this.NavigationTree.findIndex(cat => { return cat.id === newCategory.id });
    if (i >= 0) {
      this.NavigationTree = this.NavigationTree.slice(0, i + 1);
    }

    // Error, clear tree and re-build
    else  {
      this.NavigationTree = [];
      this.NavigationTree.push(newCategory);
    }
  }
}
