import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from './components/category/category.component';
// import { ProductsComponent } from './components/products/products.component';
import { ViewerComponent } from './components/viewer/viewer.component';

const routes: Routes = [
  { path: '', redirectTo: '/viewer', pathMatch: 'full' },
  { path: 'category', component: CategoryComponent },
  { path: 'category/:categoryId', component: CategoryComponent },
  // { path: 'products/:categoryId', component: ProductsComponent },
  { path: 'viewer', component: ViewerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
