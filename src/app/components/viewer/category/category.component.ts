import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
/**
 * CategoryComponent.
 * 
 * Gets one category and its children.
 */
export class CategoryComponent implements OnInit {

  // Category input/outputs
  @Input() public Category: Category;

  /**
   * Constructor.
   */
  constructor() {
  }

  /**
   * Not used.
   */
  ngOnInit() {
  }
}
