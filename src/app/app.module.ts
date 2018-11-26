import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CategoryComponent } from './components/viewer/category/category.component';
import { ProductsComponent } from './components/viewer/products/products.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { NavigationComponent } from './components/viewer/navigation/navigation.component';
import { CategoryListComponent } from './components/category-viewer/category-list/category-list.component';
import { CategoryViewerComponent } from './components/category-viewer/category-viewer.component';

@NgModule({
  declarations: [
    AppComponent,

    // Product Viewer
    ViewerComponent,
    CategoryComponent,
    ProductsComponent,
    NavigationComponent,

    // Category Viewer
    CategoryViewerComponent,
    CategoryListComponent
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
