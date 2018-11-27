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
  @Input() public Category: Category;

  // Navigation Tree
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
      this.rebuildNavigationTreeFromCategory(changes.Category.currentValue);
    }
  }

  /**
   * Re-build navigation tree from category.
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
