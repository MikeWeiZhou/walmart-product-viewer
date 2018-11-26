import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryListComponent } from './components/category-viewer/category-list/category-list.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { CategoryViewerComponent } from './components/category-viewer/category-viewer.component';

const routes: Routes = [
  { path: '', redirectTo: '/category-viewer', pathMatch: 'full' },
  { path: 'viewer', component: ViewerComponent },
  { path: 'viewer/:categoryId', component: ViewerComponent },
  { path: 'category-viewer', component: CategoryViewerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
