import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from './components/category/category.component';
// import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: 'category', component: CategoryComponent },
  { path: 'category/:categoryId', component: CategoryComponent },
  // { path: 'products/:categoryId', component: ProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
