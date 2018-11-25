import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from './components/category/category.component';
// import { ProductsComponent } from './components/products/products.component';
import { TestLoggerComponent } from './components/test-logger/test-logger.component';

const routes: Routes = [
  { path: 'category', component: CategoryComponent },
  { path: 'category/:categoryId', component: CategoryComponent },
  // { path: 'products/:categoryId', component: ProductsComponent },
  { path: 'test-logger', component: TestLoggerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
