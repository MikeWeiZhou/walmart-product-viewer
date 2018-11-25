import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './components/categories/categories.component';
import { TestLoggerComponent } from './components/test-logger/test-logger.component';

const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: 'test-logger', component: TestLoggerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
