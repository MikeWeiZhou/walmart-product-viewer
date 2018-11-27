import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
/**
 * NavigationComponent.
 * 
 * Navigation breadcrumbs for Categories.
 */
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
   * @param oldCategory Category
   * @param newCategory Category
   */
  private updateNavigationTree(oldCategory: Category, newCategory: Category): void {
    // No existing navigation tree
    if (!oldCategory) {
      this.rebuildNavigationTreeFromCategory(newCategory);
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

    // New category is inside Navigation Tree somewhere
    const i: number = this.NavigationTree.findIndex(cat => { return cat.id === newCategory.id });
    if (i >= 0) {
      this.NavigationTree = this.NavigationTree.slice(0, i + 1);
      return;
    }

    // Can't find Category anywhere, re-build navigation tree
    this.rebuildNavigationTreeFromCategory(newCategory);
  }

  /**
   * Re-build navigation tree.
   * 
   * TO DO: INCOMPLETE FUNCTION.
   * 
   * Required when a child Category is the first node.
   * Usually the first node is the root Category.
   * @param category Category
   */
  private rebuildNavigationTreeFromCategory(category: Category) {
    this.mCategoryService.GetCategory()
      .subscribe((rootCat: Category) => {
        // there is only root category
        if (rootCat.id === category.id) {
          this.NavigationTree = [category];
          return;
        }

        // delimiter in category id
        // e.g. 91083_1212910_1212923
        const delimiter: string = '_';

        // split individual categories from the category id
        // e.g.          91083_1212910_1212923
        //   turns into: ['91083', '1212910', '1212923']
        const allCatIds: string[] = category.id.split(delimiter);

        // create new navigation tree with all categories and +1 for root category
        this.NavigationTree = new Array(allCatIds.length + 1);
        this.NavigationTree[0] = rootCat;

        // start with the child category and traverse to parent
        // e.g. 91083_1212910_1212923
        let catId: string = category.id;
        for (let i = allCatIds.length - 1; i >= 0; --i) {
          this.mCategoryService.GetCategory(catId)
            .subscribe((cat: Category) => {
              // shift +1 because this.NavigationTree[0] is taken by root category
              this.NavigationTree[i+1] = cat;

              // trim last category from catId
              catId = catId.replace(delimiter + allCatIds[i], '');
            }
          );
        }
      }
    );
  }
}
