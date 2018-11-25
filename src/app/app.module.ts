import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CategoryComponent } from './components/category/category.component';
// import { ProductsComponent } from './components/products/products.component';

import { TestLoggerComponent } from './components/test-logger/test-logger.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    // ProductsComponent,
    TestLoggerComponent
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
