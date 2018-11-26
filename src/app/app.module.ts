import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductsComponent } from './components/products/products.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
// import { ProductsFilterComponent } from './components/products-filter/products-filter.component';
import { CategoryListComponent } from './components/category-viewer/category-list/category-list.component';
import { CategoryViewerComponent } from './components/category-viewer/category-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ProductsComponent,
    ViewerComponent,
    NavigationComponent,
    // ProductsFilterComponent,
    CategoryListComponent,
    CategoryViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
